import * as ex from 'excalibur';
import { Player } from './player';
import { stats } from './stats';
import { iSceneNode } from './storyScene';

export class LevelLayout extends ex.Scene implements iSceneNode {
    thisScene: string = "";
    nextScene: string = "";

    playerStart: ex.Vector = ex.vec(2, 2);

    layoutLevel(engine: ex.Engine) {

    }
    playerStartsAt(x: number, y: number) {
        this.playerStart = ex.vec(x, y);
    }
    onInitialize(engine: ex.Engine) {

        this.layoutLevel(engine);

        const actor = new Player(this.playerStart.x, this.playerStart.y);

        engine.add(actor);
        let assignment = "src/scenes/" + this.thisScene + ".ts";

        const scoreLabel = new ex.Label({
            text: "H" + stats.health + " S" + stats.score + " Opdracht: " + assignment,
            pos: ex.vec(10, 20),
            z: 2
        });
        scoreLabel.font.quality = 4;
        scoreLabel.font.size = 15;
        scoreLabel.font.unit = ex.FontUnit.Px;
        //scoreLabel.font.family = "Open Sans";
        scoreLabel.transform.coordPlane = ex.CoordPlane.Screen;
        scoreLabel.color = ex.Color.Black;
        scoreLabel.on('preupdate', (evt) => {
            scoreLabel.text = "H" + stats.health + " S" + stats.score + " Opdracht: " + assignment
        });
        engine.add(scoreLabel);

        const background = new ex.Actor({ x: 0, y: 0, z: 1, anchor: ex.Vector.Zero });
        background.transform.coordPlane = ex.CoordPlane.Screen;
        const poly = new ex.Rectangle({
            width: engine.drawWidth,
            height: 30,
            color: ex.Color.White
        });
        background.graphics.add('poly', poly);
        background.graphics.show('poly');
        engine.add(background);

        // For the test harness to be predicable
        if (!(window as any).__TESTING) {
            // Create camera strategy
            this.camera.clearAllStrategies();
            this.camera.strategy.elasticToActor(actor, 0.05, 0.1);
        }
    }
}