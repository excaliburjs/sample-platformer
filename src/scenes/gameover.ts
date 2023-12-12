import * as ex from 'excalibur';
import { iSceneNode } from '../storyScene';
import { stats } from '../stats';

export class GameOver extends ex.Scene implements iSceneNode {
    thisScene = "gameover";
    nextScene = "playerSelect";

    onInitialize(engine: ex.Engine) {
        const label = new ex.Label({
            text: "GAME OVER",
            pos: ex.vec(100, 200)
        });
        label.font.quality = 4;
        label.font.size = 40;
        label.font.unit = ex.FontUnit.Px;
        label.transform.coordPlane = ex.CoordPlane.Screen;
        label.color = ex.Color.Azure;
        engine.add(label);

        // For the test harness to be predicable
        // if (!(window as any).__TESTING) {
        //     // Create camera strategy
        //     this.camera.clearAllStrategies();
        //     this.camera.strategy.elasticToActor(actor, 0.05, 0.1);
        // }
    }
    onPostUpdate(engine: ex.Engine, _delta: number): void {
        if(engine.input.keyboard.wasPressed(ex.Input.Keys.Space)) {
            stats.reset();
        }
    }
}