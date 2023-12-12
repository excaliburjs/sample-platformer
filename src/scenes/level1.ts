import * as ex from 'excalibur';
import { LevelLayout } from '../levelLayout';
import { Floor, Wall } from '../floor';
import { Gate } from '../gate';
import { iSceneNode } from '../storyScene';

export class Level1 extends LevelLayout implements iSceneNode {
    thisScene = "level1";
    nextScene = "beforeLevel2";

    layoutLevel(engine: ex.Engine) {
        this.playerStartsAt(2, 2);
        engine.add(new Wall({ x: 0, y: 0, height: 6 }));
        engine.add(new Floor({ x: 1, y: 5, width: 2 }));

        // ---
        // Deze vloer staat te hoog. Zorg dat hij lager staat.
        engine.add(new Floor({
            x: 3,
            y: 1,
            width: 6
        }));
        // LET OP: Na de aanpassing moet je het spel herladen!
        // ---

        engine.add(new Floor({ x: 9, y: 5, width: 2 }));
        engine.add(new Gate(9, 5, 0));
        engine.add(new Wall({ x: 11, y: 0, height: 6 }));
    }
}