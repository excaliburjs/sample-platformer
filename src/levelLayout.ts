import * as ex from 'excalibur';
import { Player } from './player';
import { stats } from './stats';

export class LevelLayout extends ex.Scene {
    playerStart: ex.Vector = ex.vec(2,2);

    layoutLevel(engine: ex.Engine) {

    }
    playerStartsAt(x: number, y: number) {
        this.playerStart = ex.vec(x, y);
    }
    onInitialize(engine: ex.Engine) {

        this.layoutLevel(engine);

        const actor = new Player(this.playerStart.x, this.playerStart.y);

        engine.add(actor);

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