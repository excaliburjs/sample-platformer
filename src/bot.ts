import * as ex from 'excalibur';
import { botSpriteSheet, Resources } from './resources';
import { Baddie } from './baddie';

export class Bot extends ex.Actor {
    public onGround = true;
    public jumped = false;
    public hurt = false;
    public hurtTime: number = 0;
    constructor(x: number, y: number) {
        super({
            pos: new ex.Vector(x, y),
            body: new ex.Body({
                collider: new ex.Collider({
                    type: ex.CollisionType.Active,
                    shape: ex.Shape.Box(32, 50),
                    offset: new ex.Vector(0, 3),
                    group: ex.CollisionGroupManager.groupByName("player")
                })
            })
        });
    }

    // OnInitialize is called before the 1st actor update
    onInitialize(engine: ex.Engine) {
        // Initialize actor

        // Setup visuals, retrieve animations from sprite sheets
        const hurtleft = botSpriteSheet.getAnimationByIndices(engine, [0, 1, 0, 1, 0, 1], 150);
        hurtleft.scale = new ex.Vector(2, 2);

        const hurtright = botSpriteSheet.getAnimationByIndices(engine, [0, 1, 0, 1, 0, 1], 150);
        hurtright.scale = new ex.Vector(2, 2);
        hurtright.flipHorizontal = true;

        const idle = botSpriteSheet.getAnimationByIndices(engine, [2, 3], 800);
        idle.scale = new ex.Vector(2, 2);

        const left = botSpriteSheet.getAnimationByIndices(engine, [3, 4, 5, 6, 7], 100);
        left.scale = new ex.Vector(2, 2);
        
        const right = botSpriteSheet.getAnimationByIndices(engine, [3, 4, 5, 6, 7], 100);
        right.scale = new ex.Vector(2, 2);
        right.flipHorizontal = true;

        // Register animations with actor
        this.addDrawing("hurtleft", hurtleft);
        this.addDrawing("hurtright", hurtright);
        this.addDrawing("idle", idle);
        this.addDrawing("left", left);
        this.addDrawing("right", right);

        // onPostCollision is an event, not a lifecycle meaning it can be subscribed to by other things
        this.on('postcollision', this.onPostCollision);
    }

    onPostCollision(evt: ex.PostCollisionEvent) {
        // Bot has collided with the top of another collider
        if (evt.side === ex.Side.Top) {
            this.onGround = true;
        }

        // Bot has collided on the side, display hurt animation
        if ((evt.side === ex.Side.Left ||
             evt.side === ex.Side.Right) &&
            evt.other instanceof Baddie) {
            if (this.vel.x < 0 && !this.hurt) {
                this.setDrawing("hurtleft");
            } 
            if (this.vel.x >= 0 && !this.hurt) {
                this.setDrawing("hurtright");
            }
            this.hurt = true;
            this.hurtTime = 1000;
            Resources.hit.play(.1);
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
        }

        // Reset x velocity
        this.vel.x = 0;

        // Player input
        if(engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
            this.vel.x = -150;
        }

        if(engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
            this.vel.x = 150;
        }

        if(engine.input.keyboard.isHeld(ex.Input.Keys.Up) && this.onGround) {
            this.vel.y = -400;
            this.onGround = false;
            Resources.jump.play(.1);
        }

        // Change animation based on velocity
        if (this.vel.x < 0 && !this.hurt) {
            this.setDrawing("left");
        } 
        if (this.vel.x > 0 && !this.hurt) {
            this.setDrawing("right");
        }
        if (this.vel.x === 0 && !this.hurt){
            this.setDrawing("idle")
        }
    }
}