import * as ex from '../Excalibur/build/dist/excalibur.js';
import { blockSprite } from './resources';

export class Floor extends ex.Actor {
    constructor(x: number, y: number, public cols: number, public rows: number) {
        super({
            pos: new ex.Vector(x, y),
            scale: new ex.Vector(2, 2),
            anchor: ex.Vector.Zero,
            body: new ex.Body({
                collider: new ex.Collider({
                    type: ex.CollisionType.Fixed,
                    shape: ex.Shape.Box(20 * cols, 15 * rows, ex.Vector.Zero),
                    group: ex.CollisionGroupManager.groupByName("floor")
                })
            })
        });
    }

    onPostDraw(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                blockSprite.draw(ctx, i * blockSprite.drawWidth, j * blockSprite.drawHeight);
            }
        }
    }
}