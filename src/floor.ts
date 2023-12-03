import * as ex from 'excalibur';
import { ExcaliburGraphicsContext } from 'excalibur';
import { blockSprite, grassFlatSprite, grassBelowSprite } from './resources';

export class Floor extends ex.Actor {
    constructor(x: number, y: number, public cols: number, public rows: number) {
        super({
            name: 'Floor',
            pos: new ex.Vector(x, y),
            scale: new ex.Vector(0.2, 0.2),
            anchor: ex.Vector.Zero,
            collider: ex.Shape.Box(208 * cols,  208 * rows, ex.Vector.Zero),
            collisionType: ex.CollisionType.Fixed,
            collisionGroup: ex.CollisionGroupManager.groupByName("floor"),
        });

        for (let i = 0; i < this.cols; i++) {
            let sprite = grassFlatSprite;
            for (let j = 0; j < this.rows; j++) {
                this.graphics.show(sprite, { 
                    anchor: ex.Vector.Zero,
                    offset: ex.vec(i * sprite.width, j * sprite.height)
                })
                sprite = grassBelowSprite;
            }
        }
    }
}
