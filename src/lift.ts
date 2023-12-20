import * as ex from 'excalibur';
import { sandHalfSprite, tileSize } from './resources';
import { Player } from './player';
import { iLocation } from './location';

export interface LiftArgs {
    startPos: iLocation;
    endPos: iLocation;
}
export class Lift extends ex.Actor implements LiftArgs {
    startPos: iLocation;
    endPos: iLocation;

    constructor(args: LiftArgs) {
        super({
            pos: new ex.Vector(args.startPos.x * tileSize, args.startPos.y * tileSize + 3),
            scale: new ex.Vector(0.25, 0.25),
            anchor: ex.Vector.Down,
            collisionType: ex.CollisionType.Fixed,
            collisionGroup: ex.CollisionGroupManager.groupByName("floor"),
            collider: ex.Shape.Box(tileSize * 4, tileSize * 2, ex.Vector.Down),
        });
        this.startPos = args.startPos;
        this.endPos = args.endPos;
        this.graphics.show(sandHalfSprite);
    }

    // OnInitialize is called before the 1st actor update
    onInitialize(engine: ex.Engine) {

        // For the test harness to be predicable
        if (!(window as any).__TESTING) {
            this.actions
                .repeatForever(ctx => ctx
                    .moveTo(this.endPos.x * tileSize, this.endPos.y * tileSize, 100)
                    .moveTo(this.startPos.x * tileSize, this.startPos.y * tileSize, 100));
        }
        this.on('postcollision', (evt) => this.onPostCollision(evt));
    }

    onPostCollision(evt: ex.PostCollisionEvent) {
    }

    // onPostUpdate(engine: ex.Engine, delta: number) {
    //     if (this.vel.x < 0) {
    //         this.graphics.use("left");
    //     }
    //     if (this.vel.x > 0) {
    //         this.graphics.use("right");
    //     }
    //     if (this.vel.x === 0) {
    //         this.graphics.use("idle")
    //     }
    // }
}