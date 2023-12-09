import * as ex from 'excalibur';
import { grassFlatSprite, grassBelowSprite, tileSize } from './resources';

export class Ground extends ex.Actor {
    constructor(x: number, y: number, public cols: number, public rows: number) {
        super({
            name: 'Ground',
            pos: new ex.Vector(x*tileSize, y*tileSize),
            scale: new ex.Vector(tileSize/grassFlatSprite.width, tileSize/grassFlatSprite.width),
            anchor: ex.Vector.Zero,
            collider: ex.Shape.Box(4*tileSize * cols,  4*tileSize* rows, ex.Vector.Zero),
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

export class Floor extends Ground {
    constructor(x: number, y: number, width: number=5) {
        super(x,y,width,1);
    }
}

export class Wall extends Ground {
    constructor(x: number, y: number, height: number=5) {
        super(x,y,1,height);
    }
}