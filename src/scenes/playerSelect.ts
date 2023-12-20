import * as ex from 'excalibur';
import { boy, girl } from '../resources';
import { stats } from '../stats';
import { iCharacter } from '../icharacter';
import { TextBubble } from '../textBubble';
import { iSceneNode } from '../storyScene';


class SelectorButton extends ex.ScreenElement {
    public character;
    flip: boolean;

    constructor(x: number, y: number, sprites: iCharacter, flip: boolean = false) {
        super({
            x: x,
            y: y,
            anchor: ex.vec(0.5, 1),
        });
        this.character = sprites;
        this.flip = flip;
    }
    onInitialize() {
        const idle = ex.Animation.fromSpriteSheet(this.character.idle, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 80);
        idle.scale = new ex.Vector(0.5, 0.5);
        idle.flipHorizontal = this.flip
        this.graphics.add('idle', idle)

        const run = ex.Animation.fromSpriteSheet(this.character.run, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 80);
        run.scale = new ex.Vector(0.5, 0.5);
        run.flipHorizontal = this.flip

        this.graphics.add('run', run)
        this.graphics.use("idle");

        this.on('pointerup', () => {
            stats.character = this.character;
            stats.nextScene = true;
        })

        this.on('pointerenter', () => {
            this.graphics.use('run');
        })

        this.on('pointerleave', () => {
            this.graphics.use('idle');
        })
    }
}
function sequence(scene: ex.Scene, actors: ex.Actor[]): void {
    function fn(last: ex.Actor | null, cur: ex.Actor): ex.Actor {
        if (last === null) {
            scene.add(cur);
        } else {
            last.on(`sequence-${last.id}`, () => {
                last.actions.moveBy(0, -90, 200).fade(0, 1000).die();
                scene.add(cur);
            });
        }
        return cur;
    }
    actors.reduce(fn, null);
}

export class PlayerSelect extends ex.Scene implements iSceneNode {
    thisScene: string = "playerSelect";
    nextScene: string = "example";

    onInitialize(engine: ex.Engine) {
        engine.add(new SelectorButton(engine.drawWidth / 2 + 120, 365, girl, true));
        engine.add(new SelectorButton(engine.drawWidth / 2 - 120, 350, boy));

        const bubbleWidth = engine.drawWidth - 200
        const alan = { x: 10, y: engine.drawHeight - 290, right: bubbleWidth, down: 80 };
        const ada = { x: engine.drawWidth - 10 - bubbleWidth, y: engine.drawHeight - 290, right: bubbleWidth, down: 80 };
        const bubbles = [
            new TextBubble(alan, ["Hoi, ik ben Alan."]),
            new TextBubble(ada, ["En ik ben Ada."]),
            new TextBubble(alan,
                [
                    "Je kan ons door het doolhof helpen met de pijltjes, de spatiebalk,\n" +
                    "en wat programmeren.\n" +
                    "Met wie wil jij door het doolhof?"
                ]),
            new TextBubble(ada, ["Klik op degene met wie je wilt spelen."]),
        ];
        sequence(this, bubbles);

        // For the test harness to be predicable
        // if (!(window as any).__TESTING) {
        //     // Create camera strategy
        //     this.camera.clearAllStrategies();
        //     this.camera.strategy.elasticToActor(actor, 0.05, 0.1);
        // }
    }
}