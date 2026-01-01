import { Scene ,CollisionGroupManager, Engine} from 'excalibur';
import { Baddie } from './baddie';
import { Bot } from './bot';
import { Floor } from './floor';
import { NPC } from './npc';


export class Level extends Scene {
    constructor() {
        super();
    }

    onInitialize(engine: Engine) {

        // Create collision groups for the game
        CollisionGroupManager.create("player");
        CollisionGroupManager.create("enemy");
        CollisionGroupManager.create("floor");

        // Compose actors in scene
        const actor = new Bot(engine.halfDrawWidth + 100, engine.halfDrawHeight - 100);

        const baddie = new Baddie(engine.halfDrawWidth - 200, 300 - 30, 1);
        const baddie2 = new Baddie(engine.halfDrawWidth + 200, 300 - 30, -1);

        const npc = new NPC(400, 170);
        
        const floor = new Floor(0, 300, 15, 1);
        const otherFloor = new Floor(engine.halfDrawWidth + 50, 200, 5, 1);

        this.add(actor);
        this.add(npc);
        this.add(baddie);
        this.add(baddie2);
        this.add(floor);
        this.add(otherFloor);

        // For the test harness to be predicable
        if (!(window as any).__TESTING) {
            // Create camera strategy
            this.camera.clearAllStrategies();
            this.camera.strategy.elasticToActor(actor, 0.05, 0.1);
        }
    }
}