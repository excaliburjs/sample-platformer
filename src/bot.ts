import * as ex from 'excalibur';
import { girlHurtSpriteSheet, girlIdleSpriteSheet, girlJumpSpriteSheet, girlRunSpriteSheet, boyHurtSpriteSheet, boyIdleSpriteSheet, boyJumpSpriteSheet, boyRunSpriteSheet, Resources, tileSize } from './resources';
import { Baddie } from './baddie';
import { stats } from './stats';
import { Floor } from './floor';

export class Bot extends ex.Actor {
    public onGround = true;
    public atGate = false;
    public jumped = false;
    public hurt = false;
    public hurtTime: number = 0;

    constructor(x: number, y: number) {
        super({
            name: 'Bot',
            pos: new ex.Vector(x*tileSize, y*tileSize),
            anchor: new ex.Vector(0.5,1),
            collisionType: ex.CollisionType.Active,
            collisionGroup: ex.CollisionGroupManager.groupByName("player"),
            collider: ex.Shape.Box(32, 50, new ex.Vector(0.5,1))
        });
    }

    // OnInitialize is called before the 1st actor update
    onInitialize(engine: ex.Engine) {
        // Initialize actor
        var hurt_sprite: ex.SpriteSheet;
        var idle_sprite: ex.SpriteSheet;
        var jump_sprite: ex.SpriteSheet;
        var run_sprite: ex.SpriteSheet;
        if(stats.character=="girl") {
            hurt_sprite = girlHurtSpriteSheet;
            idle_sprite = girlIdleSpriteSheet;
            jump_sprite = girlJumpSpriteSheet;
            run_sprite = girlRunSpriteSheet;
        } else {
            hurt_sprite = boyHurtSpriteSheet;
            idle_sprite = boyIdleSpriteSheet;
            jump_sprite = boyJumpSpriteSheet;
            run_sprite = boyRunSpriteSheet;
        }
        // Setup visuals
        const hurtleft = ex.Animation.fromSpriteSheet(hurt_sprite, [0], 80);
        hurtleft.scale = new ex.Vector(0.125, 0.125);
        hurtleft.flipHorizontal = true;

        const hurtright = ex.Animation.fromSpriteSheet(hurt_sprite, [0], 80);
        hurtright.scale = new ex.Vector(0.125, 0.125);

        const idle = ex.Animation.fromSpriteSheet(idle_sprite, [0, 1,2,3,4,5,6,7,8,9], 80);
        idle.scale = new ex.Vector(0.125, 0.125);

        const jumpleft = ex.Animation.fromSpriteSheet(jump_sprite, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 80);
        jumpleft.scale = new ex.Vector(0.125, 0.125);
        jumpleft.flipHorizontal = true;

        const jumpright = ex.Animation.fromSpriteSheet(jump_sprite, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 80);
        jumpright.scale = new ex.Vector(0.125, 0.125);

        const left = ex.Animation.fromSpriteSheet(run_sprite, [0, 1, 2, 3, 4, 5, 6, 7], 40);
        left.scale = new ex.Vector(0.125, 0.125);
        left.flipHorizontal = true;

        const right = ex.Animation.fromSpriteSheet(run_sprite, [0, 1, 2, 3, 4, 5, 6, 7], 40);
        right.scale = new ex.Vector(0.125, 0.125);

        // Register animations with actor
        this.graphics.add("hurtleft", hurtleft);
        this.graphics.add("hurtright", hurtright);
        this.graphics.add("jumpleft", jumpleft);
        this.graphics.add("jumpright", jumpright);
        this.graphics.add("idle", idle);
        this.graphics.add("left", left);
        this.graphics.add("right", right);

        // onPostCollision is an event, not a lifecycle meaning it can be subscribed to by other things
        this.on('postcollision', (evt) => this.onPostCollision(evt));
    }

    onPostCollision(evt: ex.PostCollisionEvent) {
        // Bot has collided with it's Top of another collider
        //console.log(evt.other.name);
        if (evt.side === ex.Side.Bottom && evt.other instanceof Floor) {
            this.onGround = true;
        }

        // Bot has collided on the side, display hurt animation
        if ((evt.side === ex.Side.Left ||
             evt.side === ex.Side.Right) &&
            evt.other instanceof Baddie) {
            if (!this.hurt){
                if (this.vel.x < 0) {
                    this.vel.x = 300;
                    this.graphics.use("hurtleft");
                } else {
                    this.vel.x = -300;
                    this.graphics.use("hurtright");
                }
            }
            stats.health -= 1;
            this.hurt = true;
            this.hurtTime = 1000;
            this.vel.y = -200;
            this.onGround = false;
            Resources.hit.play(.1);
            if (stats.health==0) {
                // Remove ability to collide
                this.body.collisionType = ex.CollisionType.PreventCollision;

                // Launch into air with rotation
                this.acc = ex.Physics.acc;
                this.angularVelocity = 2;
                stats.gameOver = true;
            }
        }
    }

    // After main update, once per frame execute this code
    onPreUpdate(engine: ex.Engine, delta: number) {
        // If hurt, count down
        if (this.hurtTime >= 0 && this.hurt) {
            this.hurtTime -= delta;
            if (this.hurtTime < 0) {
                this.hurt = false;
            }
        } else {
            // Reset x velocity
            this.vel.x = 0;
            // Player input
            if(engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
                this.vel.x = -200;
            }

            if(engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
                this.vel.x = 200;
            }

            if(engine.input.keyboard.isHeld(ex.Input.Keys.Up) && this.onGround) {
                if (this.atGate) {
                    stats.nextScene = true;
                } else{
                    this.vel.y = -tileSize*10;
                    this.onGround = false;
                    this.graphics.use("jumpleft");
                    Resources.jump.play(.1);
                }
            }
        }

        // Change animation based on velocity
        if (!this.hurt){
            if (this.onGround) {
                if (this.vel.x < 0) {
                    this.graphics.use("left");
                } 
                if (this.vel.x > 0) {
                    this.graphics.use("right");
                }
                if (this.vel.x === 0){
                    this.graphics.use("idle")
                }
            } else{
                if (this.vel.x < 0) {
                    this.graphics.use("jumpleft");
                } else {
                    this.graphics.use("jumpright");
                }
            }
        }
    }
}