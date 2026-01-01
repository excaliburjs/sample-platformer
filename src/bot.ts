import { 
    Actor,
    CollisionGroupManager, 
    CollisionType,
    Shape, 
    vec,
    Vector,
    Engine,
    PostCollisionEvent,
    Side,
    Animation,
    Keys 
} from 'excalibur';
import { botSpriteSheet, Resources } from './resources';
import { Baddie } from './baddie';

export class Bot extends Actor {
    public onGround = true;
    public jumped = false;
    public hurt = false;
    public hurtTime: number = 0;
    constructor(x: number, y: number) {
        super({
            name: 'Bot',
            pos: vec(x, y),
            collisionType: CollisionType.Active,
            collisionGroup: CollisionGroupManager.groupByName("player"),
            collider: Shape.Box(32, 50, Vector.Half, vec(0, 3))
        });
    }

    // OnInitialize is called before the 1st actor update
    onInitialize(engine: Engine) {
        // Initialize actor

        // Setup visuals
        const hurtleft = Animation.fromSpriteSheet(botSpriteSheet, [0, 1, 0, 1, 0, 1], 150);
        hurtleft.scale = vec(2, 2);

        const hurtright = Animation.fromSpriteSheet(botSpriteSheet, [0, 1, 0, 1, 0, 1], 150);
        hurtright.scale = vec(2, 2);
        hurtright.flipHorizontal = true;

        const idle = Animation.fromSpriteSheet(botSpriteSheet, [2, 3], 800);
        idle.scale = vec(2, 2);

        const left = Animation.fromSpriteSheet(botSpriteSheet, [3, 4, 5, 6, 7], 100);
        left.scale = vec(2, 2);

        const right = Animation.fromSpriteSheet(botSpriteSheet, [3, 4, 5, 6, 7], 100);
        right.scale = vec(2, 2);
        right.flipHorizontal = true;;

        // Register animations with actor
        this.graphics.add("hurtleft", hurtleft);
        this.graphics.add("hurtright", hurtright);
        this.graphics.add("idle", idle);
        this.graphics.add("left", left);
        this.graphics.add("right", right);

        // onPostCollision is an event, not a lifecycle meaning it can be subscribed to by other things
        this.on('postcollision', (evt) => this.onPostCollision(evt));
    }

    onPostCollision(evt: PostCollisionEvent) {
        // Bot has collided with it's Top of another collider
        console.log(evt.other.owner.name);
        if (evt.side === Side.Bottom) {
            this.onGround = true;
        }

        // Bot has collided on the side, display hurt animation
        if ((evt.side === Side.Left ||
             evt.side === Side.Right) &&
            evt.other.owner instanceof Baddie) {
            if (this.vel.x < 0 && !this.hurt) {
                this.graphics.use("hurtleft");
            } 
            if (this.vel.x >= 0 && !this.hurt) {
                this.graphics.use("hurtright");
            }
            this.hurt = true;
            this.hurtTime = 1000;
            Resources.hit.play(.1);
        }
    }

    // After main update, once per frame execute this code
    onPreUpdate(engine: Engine, delta: number) {
        // If hurt, count down
        if (this.hurtTime >= 0 && this.hurt) {
            this.hurtTime -= delta;
            if (this.hurtTime < 0) {
                this.hurt = false;
            }
        }

        // Reset x velocity
        this.vel.x = 0;

        // Player input
        if(engine.input.keyboard.isHeld(Keys.Left)) {
            this.vel.x = -150;
        }

        if(engine.input.keyboard.isHeld(Keys.Right)) {
            this.vel.x = 150;
        }

        if(engine.input.keyboard.isHeld(Keys.Up) && this.onGround) {
            this.vel.y = -400;
            this.onGround = false;
            Resources.jump.play(.1);
        }

        // Change animation based on velocity
        if (this.vel.x < 0 && !this.hurt) {
            this.graphics.use("left");
        } 
        if (this.vel.x > 0 && !this.hurt) {
            this.graphics.use("right");
        }
        if (this.vel.x === 0 && !this.hurt){
            this.graphics.use("idle")
        }
    }
}