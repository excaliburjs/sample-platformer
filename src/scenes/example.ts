import * as ex from 'excalibur';
import { Baddie } from '../baddie';
import { Floor, Ground, Wall } from '../ground';
import { NPC } from '../npc';
import { Gate } from '../gate';
import { LevelLayout } from '../levelLayout';
import { iSceneNode } from '../storyScene';
import { Potion } from '../potion';
import { tileSize } from '../resources';

export class Example extends LevelLayout implements iSceneNode {
    thisScene = "example";
    nextScene = "beforeLevel1";

    layoutLevel(engine: ex.Engine) {

        engine.add(new Floor({ x: -3, y: 0, right: 20 }));
        engine.add(new Wall({ x: -3, y: 5, down: 19 }));

        engine.add(new Floor({ x: -2, y: 19, right: 17 }));

        engine.add(new Floor({ x: -1, y: 17, right: 3 }));
        engine.add(new Floor({ x: 0, y: 15, right: 2 }));
        engine.add(new Floor({ x: 0, y: 13, right: 2 }));
        engine.add(new Floor({ x: 1, y: 11, right: 1 }));
        engine.add(new Floor({ x: 1, y: 9, right: 1 }));
        engine.add(new Floor({ x: 1, y: 7, right: 1 }));
        engine.add(new Potion({ x: 1, y: 7, scaleTo: 1 }));

        engine.add(new Wall({ x: 2, y: 3, down: 15.5 }));
        engine.add(new Floor({ x: 4, y: 5, right: 5 }));

        engine.add(new Floor({ x: 3, y: 13, right: 2 }));
        engine.add(new Floor({ x: 3, y: 16, right: 1 }));
        engine.add(new Potion({ x: 3, y: 16, scaleTo: 0.5 }));

        this.playerStartsAt({ x: 4, y: 12 });
        engine.add(new Baddie({ x: 4, y: 15 }));
        engine.add(new Floor({ x: 8, y: 11, right: 4 }));
        engine.add(new Baddie({ x: 8, y: 15 }));
        engine.add(new NPC({ x: 9, y: 11 }));
        engine.add(new Gate({ x: 9, y: 11, goal: 2 }));
        engine.add(new Floor({ x: 14, y: 16, right: 1 }));
        engine.add(new Wall({ x: 15, y: 0, down: 20 }));
    }
    initCamera(player: ex.Actor) {
        super.initCamera(player);
        this.camera.strategy.lockToActor(player);
        this.camera.strategy.limitCameraBounds(new ex.BoundingBox(-2 * tileSize, 0 * tileSize, 20 * tileSize, 20 * tileSize));
    }
}