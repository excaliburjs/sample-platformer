import * as ex from 'excalibur';
import { LevelLayout } from '../core/levelLayout';
import { Floor, Wall } from '../actors/ground';
import { Gate } from '../actors/gate';
import { iSceneNode } from '../core/storyScene';

export class Level2 extends LevelLayout implements iSceneNode {
    thisScene = "level2";
    nextScene = "gameover";

    layoutLevel(engine: ex.Engine) {
        this.playerStartsAt({ x: 2, y: 2 });
        engine.add(new Wall({ x: 0, y: 0, down: 6 }));
        engine.add(new Floor({ x: 1, y: 5, right: 2 }));

        // ---
        // Deze vloer staat te hoog. Zorg dat hij lager staat.
        engine.add(new Floor({
            x: 2,
            y: 7,
            right: 8
        }));
        // LET OP: Na de aanpassing moet je het spel herladen!
        // ---

        engine.add(new Floor({ x: 11, y: 5, right: 2 }));
        engine.add(new Gate({ x: 11, y: 5, goal: 0 }));
        engine.add(new Wall({ x: 13, y: 0, down: 6 }));
    }
}