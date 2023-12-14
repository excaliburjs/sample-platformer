import * as ex from 'excalibur';
import { potionPurpleSprite, tileSize } from './resources';
import { Player } from './player';
import { stats } from './stats';
import { iLocation } from './location';
import { iArtifact } from './iartifact';

interface PotionArgs extends iLocation {
    scaleTo: number;
}

export class Potion extends ex.Actor implements iArtifact {
    public scaleTo = 0.5;

    constructor(args: PotionArgs) {
        super({
            name: 'Potion',
            pos: new ex.Vector(args.x * tileSize, args.y * tileSize),
            scale: new ex.Vector(0.5, 0.5),
            anchor: ex.Vector.Down,
            collider: ex.Shape.Box(tileSize, tileSize, ex.Vector.Down),
            collisionType: ex.CollisionType.Passive,
            collisionGroup: ex.CollisionGroupManager.groupByName("floor"),
        });
        this.scaleTo = args.scaleTo;
        this.graphics.show(potionPurpleSprite);

        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
        this.on('collisionend', (evt) => this.onCollisionEnd(evt));
    }
    activateArtifact(player: Player) {
        this.scene.camera.zoomOverTime(1 / this.scaleTo, 2000);
        player.scaleTarget = this.scaleTo;
        this.kill();
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
