import * as ex from '../Excalibur/build/dist/excalibur.js';
import { botSpriteSheet } from './resources';

export class Bot extends ex.Actor {
    public onGround = true;
    constructor(x: number, y: number) {
        super({
            pos: new ex.Vector(x, y),
            anchor: new ex.Vector(.5, .55),
            body: new ex.Body({
                collider: new ex.Collider({
                    type: ex.CollisionType.Active,
                    shape: ex.Shape.Box(32, 50),
                    group: ex.CollisionGroupManager.groupByName("player")
                })
            })
        });
    }

    // OnInitialize is called before the 1st actor update
    onInitialize(engine: ex.Engine) {
        // Initialize actor

        // Setup visuals
        const idle = botSpriteSheet.getAnimationByIndices(engine, [2, 3], 800);
        idle.scale = new ex.Vector(2, 2);
        const left = botSpriteSheet.getAnimationByIndices(engine, [3, 4, 5, 6, 7], 100);
        left.scale = new ex.Vector(2, 2);
        const right = botSpriteSheet.getAnimationByIndices(engine, [3, 4, 5, 6, 7], 100);
        right.scale = new ex.Vector(2, 2);
        right.flipHorizontal = true;

        this.addDrawing("idle", idle);
        this.addDrawing("left", left);
        this.addDrawing("right", right);

        this.on('postcollision', (evt) => {
            if (evt.side === ex.Side.Top) {
                this.onGround = true;
            }
        });

    }

    onPostUpdate(engine: ex.Engine) {
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
        if (this.vel.x < 0) {
            this.setDrawing("left");
        } 
        if (this.vel.x > 0) {
            this.setDrawing("right");
        }
        if (this.vel.x === 0){
            this.setDrawing("idle")
        }
    }
}