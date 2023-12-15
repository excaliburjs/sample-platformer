import { potionPurpleSprite, potionYellowSprite } from './resources';
import { Player } from './player';
import { iLocation } from './location';
import { Artifact } from './artifact';

interface PotionArgs extends iLocation {
    scaleTo: number;
}

export class Potion extends Artifact {
    public scaleTo = 0.5;

    constructor(args: PotionArgs) {
        super({ ...args });
        this.scaleTo = args.scaleTo;
        if (args.scaleTo < 1) {
            this.graphics.show(potionPurpleSprite);
        } else {
            this.graphics.show(potionYellowSprite);
        }
    }
    activateArtifact(player: Player) {
        this.scene.camera.zoomOverTime(1 / this.scaleTo, 2000);
        player.scaleTarget = this.scaleTo;
        this.kill(10);
    }
}
