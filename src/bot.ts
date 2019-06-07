import * as ex from '../Excalibur/build/dist/excalibur.js';
import { botSpriteSheet } from './resources';
import { Baddie } from './baddie';

export class Bot extends ex.Actor {
    public onGround = true;
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

        // Setup visuals
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

        this.addDrawing("hurtleft", hurtleft);
        this.addDrawing("hurtright", hurtright);
        this.addDrawing("idle", idle);
        this.addDrawing("left", left);
        this.addDrawing("right", right);

        this.on('postcollision', (evt) => {
            if (evt.side === ex.Side.Top) {
                this.onGround = true;
            }

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
            }
        });

    }

    onPostUpdate(engine: ex.Engine, delta: number) {
        if (this.hurtTime >= 0 && this.hurt) {
            this.hurtTime -= delta;
            if (this.hurtTime < 0) {
                this.hurt = false;
            }
        }
        this.vel.x = 0;

        if(engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
            this.vel.x = -150;
        }

        if(engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
            this.vel.x = 150;
        }

        if(engine.input.keyboard.isHeld(ex.Input.Keys.Up) && this.onGround) {
            this.vel.y = -400;
            this.onGround = false;
        }
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