import * as ex from 'excalibur';
import { Baddie } from '../baddie';
import { Ground } from '../floor';
import { NPC } from '../npc';
import { Gate } from '../gate';
import { LevelLayout } from '../levelLayout';
import { iSceneNode } from '../storyScene';

export class Level3 extends LevelLayout implements iSceneNode {
    thisScene = "level3";
    nextScene = "gameover";

    layoutLevel(engine: ex.Engine) {

        this.playerStartsAt(9, 2);
        const baddie = new Baddie(4, 5, 2, 10);
        const baddie2 = new Baddie(8, 5, 4, 14);

        const npc = new NPC(9, 2);
        const gate = new Gate(9, 2, 2);

        const wall1 = new Ground(0, 0, 1, 10);
        const wall2 = new Ground(15, 0, 1, 10);
        const floor = new Ground(0, 5, 15, 1);
        const otherFloor = new Ground(8, 2, 5, 1);

        engine.add(gate);
        engine.add(npc);
        engine.add(baddie);
        engine.add(baddie2);
        engine.add(floor);
        engine.add(wall1);
        engine.add(wall2);
        engine.add(otherFloor);
    }
}