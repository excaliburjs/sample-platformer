import * as ex from 'excalibur';
import { Actor } from "./actor";
import { iArtifact } from "./iartifact";
import { iLocation } from "./location";
import { tileSize } from './resources';
import { Player } from './player';

export class Artifact extends Actor implements iArtifact {

    constructor(args: iLocation) {
        super({
            name: 'Potion',
            pos: new ex.Vector(args.x * tileSize, args.y * tileSize),
            scale: new ex.Vector(0.5, 0.5),
            anchor: ex.Vector.Down,
            collider: ex.Shape.Box(tileSize, tileSize, ex.vec(0, 1)),
            collisionType: ex.CollisionType.Passive,
            collisionGroup: ex.CollisionGroupManager.groupByName("floor"),
        });
        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
        this.on('collisionend', (evt) => this.onCollisionEnd(evt));
    }
    activateArtifact(player: Player) {
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
