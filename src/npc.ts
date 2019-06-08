import * as ex from '../Excalibur/build/dist/excalibur.js';
import { botRedSpriteSheet, Resources, npcSprite } from './resources';

export class NPC extends ex.Actor {
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

        // Set the z-index to be behind everything
        this.z = -1;

        // Setup visuals
        const hurtleft = botRedSpriteSheet.getAnimationByIndices(engine, [0, 1, 0, 1, 0, 1], 150);
        hurtleft.scale = new ex.Vector(2, 2);

        const hurtright = botRedSpriteSheet.getAnimationByIndices(engine, [0, 1, 0, 1, 0, 1], 150);
        hurtright.scale = new ex.Vector(2, 2);
        hurtright.flipHorizontal = true;

        const idle = botRedSpriteSheet.getAnimationByIndices(engine, [2, 3], 800);
        idle.scale = new ex.Vector(2, 2);

        const left = botRedSpriteSheet.getAnimationByIndices(engine, [3, 4, 5, 6, 7], 100);
        left.scale = new ex.Vector(2, 2);
        
        const right = botRedSpriteSheet.getAnimationByIndices(engine, [3, 4, 5, 6, 7], 100);
        right.scale = new ex.Vector(2, 2);
        right.flipHorizontal = true;

        // Register drawings
        this.addDrawing("hurtleft", hurtleft);
        this.addDrawing("hurtright", hurtright);
        this.addDrawing("idle", idle);
        this.addDrawing("left", left);
        this.addDrawing("right", right);

       // Setup patroling behavior
       this.actions.moveBy(100, 0, 20)
                   .moveBy(-100, 0, 20)
                   .repeatForever();

    }

    onPostUpdate(engine: ex.Engine, delta: number) {
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

    // Custom draw after local tranform, draws word bubble
    onPostDraw(ctx: CanvasRenderingContext2D) {
        npcSprite.draw(ctx, -10, -100);
    }
}