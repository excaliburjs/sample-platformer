import * as ex from '../Excalibur/build/dist/excalibur.js';
import { Baddie } from './baddie';
import { Bot } from './bot';
import { Floor } from './floor';

export class Game extends ex.Scene {
    constructor(engine: ex.Engine) {
        super(engine);
    }

    onInitialize(engine: ex.Engine) {
        // Create collision groups for the game
        ex.CollisionGroupManager.create("player");
        ex.CollisionGroupManager.create("enemy");
        ex.CollisionGroupManager.create("floor");

        const actor = new Bot(engine.halfDrawWidth + 100, engine.halfDrawHeight - 100);

        const baddie = new Baddie(engine.halfDrawWidth, engine.halfDrawHeight + 60);
        const baddie2 = new Baddie(engine.halfDrawWidth - 60, engine.halfDrawHeight + 60);
        
        
        const floor = new Floor(0, 300, 15, 1);
        const otherFloor = new Floor(engine.halfCanvasWidth + 50, 200, 5, 1);

        engine.add(actor);
        engine.add(baddie);
        engine.add(baddie2);
        engine.add(floor);
        engine.add(otherFloor);
    }
}