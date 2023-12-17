import * as ex from 'excalibur';
import { stats } from './stats';
import { TextBubble } from './textBubble';

export interface iSceneNode {
    thisScene: string;
    nextScene: string;
}

export class BeforeLevelScene extends ex.Scene {

    protected text: string[] = [];
    public bubbleEnded: boolean = false;

    onInitialize(engine: ex.Engine) {
        const actor = new ex.Actor({ x: 250, y: 500, anchor: ex.vec(0.5, 1) });
        const idle = ex.Animation.fromSpriteSheet(stats.character.idle, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 80);
        idle.scale = new ex.Vector(1, 1);
        actor.graphics.use(idle);
        engine.add(actor);
        const bubble = new TextBubble(
            { x: 10, y: engine.drawHeight - 80, right: engine.drawWidth - 20, down: 80 },
            this.text
        );
        bubble.on('sequence', () => { this.bubbleEnded = true; });
        engine.add(bubble);
    }
    onPreUpdate(engine: ex.Engine, delta: number) {
        if (this.bubbleEnded) {
            if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space) || engine.input.keyboard.wasPressed(ex.Input.Keys.Right)) {
                stats.nextScene = true;
            }
        }
    }
}