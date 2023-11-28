import * as ex from 'excalibur';
import { Baddie } from './baddie';
import { Bot } from './bot';
import { Floor } from './floor';
import { NPC } from './npc';

export class Level extends ex.Scene {
    constructor() {
        super();
    }

    onInitialize(engine: ex.Engine) {

        // Create collision groups for the game
        ex.CollisionGroupManager.create("player");
        ex.CollisionGroupManager.create("enemy");
        ex.CollisionGroupManager.create("floor");

        // Compose actors in scene
        const actor = new Bot(engine.halfDrawWidth + 100, engine.halfDrawHeight - 100);

        const baddie = new Baddie(engine.halfDrawWidth - 200, 300 - 30, 1);
        const baddie2 = new Baddie(engine.halfDrawWidth + 200, 300 - 30, -1);

        const npc = new NPC(400, 170);
        
        const wall1 = new Floor(0, 0, 1, 10);
        const wall2 = new Floor(15*40, 0*30, 1, 10);
        const floor = new Floor(0*40, 10*30, 15, 1);
        const otherFloor = new Floor(engine.halfDrawWidth + 50, 210, 5, 1);

        engine.add(actor);
        engine.add(npc);
        engine.add(baddie);
        engine.add(baddie2);
        engine.add(floor);
        engine.add(wall1);
        engine.add(wall2);
        engine.add(otherFloor);

        const scoreLabel = new ex.Label({
            text: "Score: " + actor.health,
            pos: ex.vec(10, 20)
        });
        scoreLabel.font.quality = 4;
        scoreLabel.font.size = 15;
        scoreLabel.font.unit = ex.FontUnit.Px;
        //scoreLabel.font.family = "Open Sans";
        scoreLabel.transform.coordPlane = ex.CoordPlane.Screen;
        scoreLabel.color = ex.Color.Azure;
        scoreLabel.on('preupdate', (evt) => {
            scoreLabel.text = "Score: " + actor.health;
        });
        engine.add(scoreLabel);

        // For the test harness to be predicable
        if (!(window as any).__TESTING) {
            // Create camera strategy
            this.camera.clearAllStrategies();
            this.camera.strategy.elasticToActor(actor, 0.05, 0.1);
        }
    }
}