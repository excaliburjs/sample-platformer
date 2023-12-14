import * as ex from 'excalibur';
import { gateOpenSpriteSheet, gateClosedSpriteSheet, tileSize } from './resources';
import { Player } from './player';
import { stats } from './stats';
import { iLocation } from './location';
import { iArtifact } from './iartifact';

export interface GateArgs extends iLocation {
    goal: number;
}
export class Gate extends ex.Actor implements iArtifact {
    public isOpen = false;

    constructor(args: GateArgs) {
        super({
            name: 'Gate',
            pos: new ex.Vector(args.x * tileSize, args.y * tileSize),
            scale: new ex.Vector(0.5, 0.5),
            anchor: ex.Vector.Down,
            collider: ex.Shape.Box(tileSize * 4, tileSize * 4, ex.Vector.Down, new ex.Vector((228 - tileSize * 4) / 2, 0)),
            collisionType: ex.CollisionType.Passive,
            collisionGroup: ex.CollisionGroupManager.groupByName("floor"),
        });
        // Set the z-index to be behind everything
        this.z = -2;
        const goal = stats.score + args.goal;
        const closed = ex.Animation.fromSpriteSheet(gateClosedSpriteSheet, [0], 800);
        const opened = ex.Animation.fromSpriteSheet(gateOpenSpriteSheet, [0], 800);
        this.graphics.add("closed", closed);
        this.graphics.add("opened", opened);
        this.graphics.use("closed");

        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
        this.on('collisionend', (evt) => this.onCollisionEnd(evt));


        // Custom draw after local tranform, draws word bubble
        this.graphics.onPostDraw = (ctx) => {
            if (stats.score == goal) {
                this.isOpen = true;
            }
            if (this.isOpen) {
                this.graphics.use("opened");
            } else {
                this.graphics.use("closed");
            }
        }
    }
    activateArtifact(player: Player) {
        if (this.isOpen) {
            stats.nextScene = true;
        }
    }
    onCollisionStart(evt: ex.CollisionStartEvent) {
        if (evt.other instanceof Player) {
            evt.other.atArtifact = this;
        }
    }

    onCollisionEnd(evt: ex.CollisionEndEvent) {
        if (evt.other instanceof Player) {
            evt.other.atArtifact = null;
        }
    }

}
