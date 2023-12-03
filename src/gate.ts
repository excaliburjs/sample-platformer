import * as ex from 'excalibur';
import { gateOpenSpriteSheet, gateClosedSpriteSheet } from './resources';
import { Bot } from './bot';
import { stats } from './stats';

export class Gate extends ex.Actor {
    public isOpen = false;

    constructor(x: number, y: number) {
        super({
            name: 'Gate',
            pos: new ex.Vector(x, y),
            scale: new ex.Vector(0.5, 0.5),
            anchor: ex.Vector.Zero,
            collider: ex.Shape.Box(228/2, 227, ex.Vector.Zero, new ex.Vector(228/4, 0)),
            collisionType: ex.CollisionType.Passive,
            collisionGroup: ex.CollisionGroupManager.groupByName("floor"),
        });

        // Set the z-index to be behind everything
        this.z = -2;
        const closed = ex.Animation.fromSpriteSheet(gateClosedSpriteSheet, [0], 800);
        const opened = ex.Animation.fromSpriteSheet(gateOpenSpriteSheet, [0], 800);
        this.graphics.add("closed", closed);
        this.graphics.add("opened", opened);
        this.graphics.use("closed");

        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
        this.on('collisionend', (evt) => this.onCollisionEnd(evt));


        // Custom draw after local tranform, draws word bubble
        this.graphics.onPostDraw = (ctx) => {
            if(stats.score==2) {
                this.isOpen = true;
            }
            if (this.isOpen) {
                this.graphics.use("opened");
            } else {
                this.graphics.use("closed");
            }
        }
    }
    onCollisionStart(evt: ex.CollisionStartEvent) {
        if (evt.other instanceof Bot){
            evt.other.atGate = this.isOpen;
        }
    }

    onCollisionEnd(evt: ex.CollisionEndEvent) {
        if (evt.other instanceof Bot){
            evt.other.atGate = false;
        }
    }

}
