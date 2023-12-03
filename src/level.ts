import * as ex from 'excalibur';
import { Baddie } from './baddie';
import { Bot } from './bot';
import { Floor } from './floor';
import { NPC } from './npc';
import { stats } from './stats';
import { Gate } from './gate';
import { tileSize } from './resources';

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
        const actor = new Bot(9, 2);

        const baddie = new Baddie(4, 5, 2, 10);
        const baddie2 = new Baddie(8, 5, 4, 14);

        const npc = new NPC(9, 2);
        const gate = new Gate(9, 2);
        
        const wall1 = new Floor(0, 0, 1, 10);
        const wall2 = new Floor(15, 0, 1, 10);
        const floor = new Floor(0, 5, 15, 1);
        const otherFloor = new Floor(8, 2, 5, 1);

        engine.add(gate);
        engine.add(actor);
        engine.add(npc);
        engine.add(baddie);
        engine.add(baddie2);
        engine.add(floor);
        engine.add(wall1);
        engine.add(wall2);
        engine.add(otherFloor);

        const scoreLabel = new ex.Label({
            text: "Health: " + stats.health + " Score: " + stats.score,
            pos: ex.vec(10, 20)
        });
        scoreLabel.font.quality = 4;
        scoreLabel.font.size = 15;
        scoreLabel.font.unit = ex.FontUnit.Px;
        //scoreLabel.font.family = "Open Sans";
        scoreLabel.transform.coordPlane = ex.CoordPlane.Screen;
        scoreLabel.color = ex.Color.Azure;
        scoreLabel.on('preupdate', (evt) => {
            scoreLabel.text= "Health: " + stats.health + " Score: " + stats.score
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