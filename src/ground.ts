import * as ex from 'excalibur';
import { grassFlatSprite, grassBelowSprite, tileSize } from './resources';
import { iBox, iFloor, iWall } from './location';

export class Ground extends ex.Actor {
    constructor(args: iBox) {
        const scale = (args.scale !== undefined ? args.scale : 1) * tileSize;
        super({
            name: 'Ground',
            pos: new ex.Vector(args.x * scale, args.y * scale),
            scale: new ex.Vector(scale / grassFlatSprite.width, scale / grassFlatSprite.width),
            anchor: ex.Vector.Zero,
            collider: ex.Shape.Box(4 * tileSize * args.right, 4 * tileSize * args.down, ex.Vector.Zero),
            collisionType: ex.CollisionType.Fixed,
            collisionGroup: ex.CollisionGroupManager.groupByName("floor"),
        });

        for (let i = 0; i < args.right; i++) {
            let sprite = grassFlatSprite;
            for (let j = 0; j < args.down; j++) {
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
    constructor(args: iFloor) {
        super({ down: 1, ...args });
    }
}

export class Wall extends Ground {
    constructor(args: iWall) {
        super({ right: 1, ...args });
    }
}