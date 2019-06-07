import * as ex from '../Excalibur/build/dist/excalibur.js';
import { Resources, baddieSpriteSheet } from "./resources";

export class Baddie extends ex.Actor {
    constructor(x: number, y: number, public dir: number) {
        super({
            pos: new ex.Vector(x, y),
            body: new ex.Body({
                collider: new ex.Collider({
                    type: ex.CollisionType.Active,
                    shape: ex.Shape.Box(32, 50),
                    offset: new ex.Vector(0, -1),
                    group: ex.CollisionGroupManager.groupByName("enemy")
                })
            })
        });
    }

    // OnInitialize is called before the 1st actor update
    onInitialize(engine: ex.Engine) {
        // Initialize actor

        // Setup visuals
        const left = baddieSpriteSheet.getAnimationByIndices(engine, [2, 3, 4, 5], 100);
        left.scale = new ex.Vector(2, 2);
        const right = baddieSpriteSheet.getAnimationByIndices(engine, [2, 3, 4, 5], 100);
        right.scale = new ex.Vector(2, 2);
        right.flipHorizontal = true;

        this.addDrawing("left", left)
        this.addDrawing("right", right);


        // Setup patroling behavior
        this.actions.moveBy(400 * this.dir, 0, 100)
                    .moveBy(-400 * this.dir, 0, 100)
                    .repeatForever();
    }

    onPostUpdate() {
        if (this.vel.x < 0) {
            this.setDrawing("left");
        } else if (this.vel.x > 0) {
            this.setDrawing("right");
        }
    }
    
}