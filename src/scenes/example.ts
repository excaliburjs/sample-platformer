import * as ex from 'excalibur';
import { Baddie } from '../baddie';
import { Floor, Ground, Wall } from '../ground';
import { NPC } from '../npc';
import { Gate } from '../gate';
import { LevelLayout } from '../levelLayout';
import { iSceneNode } from '../storyScene';

export class Example extends LevelLayout implements iSceneNode {
    thisScene = "example";
    nextScene = "beforeLevel1";

    layoutLevel(engine: ex.Engine) {

        engine.add(new Wall({ x: 0, y: 0, down: 20 }));
        engine.add(new Floor({ x: 0, y: 0, right: 14 }));
        engine.add(new Floor({ x: 1, y: 19, right: 14 }));
        engine.add(new Floor({ x: 1, y: 13, right: 1 }));
        this.playerStartsAt({ x: 2, y: 12 });
        engine.add(new Floor({ x: 1, y: 16, right: 1 }));
        engine.add(new Baddie({ x: 4, y: 15 }));
        engine.add(new Floor({ x: 8, y: 12, right: 4 }));
        engine.add(new Baddie({ x: 8, y: 15 }));
        engine.add(new NPC({ x: 9, y: 12 }));
        engine.add(new Gate({ x: 9, y: 12, goal: 2 }));
        engine.add(new Floor({ x: 14, y: 13, right: 1 }));
        engine.add(new Floor({ x: 14, y: 16, right: 1 }));
        engine.add(new Wall({ x: 15, y: 0, down: 20 }));

    }
}