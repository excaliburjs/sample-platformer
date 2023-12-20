import * as ex from 'excalibur';
import { potionPurpleSprite, potionYellowSprite, tileSize } from '../core/resources';
import { Player } from './player';
import { iLocation } from '../core/location';
import { Artifact } from '../core/artifact';

interface PotionArgs extends iLocation {
    potionColor: "purple" | "yellow";
}

export class Potion extends Artifact {
    public potionColor: string;

    constructor(args: PotionArgs) {
        super({ name: "Potion", ...args });
        this.potionColor = args.potionColor;
        switch (this.potionColor) {
            case "purple":
                this.graphics.show(potionPurpleSprite);
                break;
            case "yellow":
                this.graphics.show(potionYellowSprite);
                break;
            default:
                throw new Error("unknown potion color");
        }
    }
    activateArtifact(player: Player) {
        switch (this.potionColor) {
            case "purple":
                this.scene.camera.zoomOverTime(2, 2000);
                player.scaleTarget = 0.5;
                break;
            case "yellow":
                this.scene.camera.zoomOverTime(1, 2000);
                player.scaleTarget = 1;
                break;
        }
        var emitter = new ex.ParticleEmitter({
            x: this.pos.x + tileSize / 4, y: this.pos.y - tileSize / 4,
            width: tileSize / 2, height: tileSize / 2,
            emitterType: ex.EmitterType.Circle,
            radius: 5,
            minVel: 0,
            maxVel: 48,
            minAngle: 0,
            maxAngle: 6.2,
            isEmitting: true,
            emitRate: 9,
            opacity: 1,
            fadeFlag: true,
            particleLife: 1000,
            maxSize: 10,
            minSize: 1,
            startSize: 0,
            endSize: 0,
            acceleration: new ex.Vector(-13, -33),
            beginColor: this.potionColor == "purple" ? ex.Color.Magenta : ex.Color.Yellow,
            endColor: ex.Color.Transparent,
        });
        this.scene.add(emitter);
        this.killAfter(1.5, 10, () => {
            this.scene.remove(emitter);
        })
    }
}
