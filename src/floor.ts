import { blockSprite } from './resources';
import { 
    Actor,
    CollisionGroupManager, 
    CollisionType, 
    GraphicsGroup, 
    Shape, 
    vec, 
    Vector 
} from 'excalibur';

export class Floor extends Actor {
    constructor(x: number, y: number, public cols: number, public rows: number) {
        super({
            name: 'Floor',
            pos: vec(x, y),
            scale: vec(2, 2),
            anchor: Vector.Zero,
            collider: Shape.Box(20 * cols, 15 * rows, Vector.Zero),
            collisionType: CollisionType.Fixed,
            collisionGroup: CollisionGroupManager.groupByName("floor"),
        });

        // build an array of members for the GraphicsGroup
        const members = [];

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                members.push({
                    graphic: blockSprite,
                    offset: vec(i * blockSprite.width, j * blockSprite.height)
                });
            }
        }

        // create a GraphicsGroup and use it on this actor
        const group = new GraphicsGroup({
            useAnchor: false, // position tiles relative to top-left of the actor
            members
        });

        this.graphics.use(group); // use GraphicsGroup instead of show()
    }
}
