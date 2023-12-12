import * as ex from 'excalibur';
import { LevelLayout } from '../levelLayout';
import { Floor, Wall } from '../floor';
import { Gate } from '../gate';
import { iSceneNode } from '../storyScene';

export class Level2 extends LevelLayout implements iSceneNode {
    thisScene = "level2";
    nextScene = "beforeLevel3";

    layoutLevel(engine: ex.Engine) {
        this.playerStartsAt(2, 2);
        engine.add(new Wall({ x: 0, y: 0, height: 6 }));
        engine.add(new Floor({ x: 1, y: 5, width: 2 }));

        // ---
        // Deze vloer staat te hoog. Zorg dat hij lager staat.
        engine.add(new Floor({
            x: 2,
            y: 7,
            width: 2
        }));
        // LET OP: Na de aanpassing moet je het spel herladen!
        // ---

        engine.add(new Floor({ x: 11, y: 5, width: 2 }));
        engine.add(new Gate(11, 5, 0));
        engine.add(new Wall({ x: 13, y: 0, height: 6 }));
    }
}