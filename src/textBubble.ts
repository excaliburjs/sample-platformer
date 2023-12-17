import * as ex from 'excalibur';
import { Resources } from './resources';
import { iBox } from './location';


export class TextBubble extends ex.ScreenElement {
    timer: ex.Timer;
    line: number = 0;
    index: number = 1;
    textGraph: ex.Text;
    pause: number = 0;
    ignoreFirstKeys: boolean = false;

    constructor(public bubble: iBox, public texts: string[]) {
        super({
            x: bubble.x,
            y: bubble.y,
            anchor: ex.vec(0, 0),
        });
        this.textGraph = new ex.Text({
            text: texts[this.line][0],
            maxWidth: bubble.right,
            font: new ex.Font({
                quality: 4,
                size: 20,
                unit: ex.FontUnit.Px
            })
        });
        this.graphics.add('text', this.textGraph);
        this.graphics.show('text');
        this.graphics.onPreDraw = (ctx: ex.ExcaliburGraphicsContext) => {
            ctx.save();
            ctx.z = -1;
            ctx.translate(0, -20);
            ctx.drawRectangle(ex.vec(0, 0), bubble.right, bubble.down, ex.Color.White);
            ctx.restore();
        };
        this.timer = new ex.Timer({
            fcn: () => this.timerEvent(),
            repeats: true,
            interval: 50,
        });
    }
    timerEvent() {
        if (this.pause != 0) {
            this.pause -= 1;
        } else {
            if (/^[a-zA-Z0-9]+$/.test(this.texts[this.line][this.index - 1])) {
                Resources.jump.play(.1);
            } else if (/^[^ a-zA-Z0-9\n]+$/.test(this.texts[this.line][this.index - 1])) {
                this.pause = 2;
            }
            this.textGraph.text = this.texts[this.line].substring(0, this.index);
            this.index += 1;
            if (this.index == this.texts[this.line].length + 1) {
                this.lineEnded();
            }
        }
    }
    onInitialize(engine: ex.Engine) {
        this.scene.addTimer(this.timer);
        this.timer.start();
        this.ignoreFirstKeys = engine.input.keyboard.wasPressed(ex.Input.Keys.Space) || engine.input.keyboard.wasPressed(ex.Input.Keys.Right);
    }
    onPreUpdate(engine: ex.Engine, delta: number) {
        if (this.ignoreFirstKeys) {
            // When a previous TextBubble is ended on a keypress, it still 
            // shows as "pressed"when the next one is created and the 
            // onPreUpdate is triggered. That's wy we need this hack.
            this.ignoreFirstKeys = false;
            return;
        }
        if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space) || engine.input.keyboard.wasPressed(ex.Input.Keys.Right)) {
            if (this.index != this.texts[this.line].length + 1) {
                this.textGraph.text = this.texts[this.line];
                this.index = this.texts[this.line].length + 1;
                this.lineEnded();
            } else if (this.line < this.texts.length - 1) {
                this.line += 1;
                this.index = 0;
                this.pause = 0;
                this.textGraph.text = ""
                this.timer.start();
            } else {
                this.bubbleEnded();
            }
        } else if (engine.input.keyboard.wasPressed(ex.Input.Keys.Left)) {
            if (this.line > 0) {
                this.line -= 1;
                this.index = 0;
                this.pause = 0;
                this.textGraph.text = ""
                this.timer.start();
            }
        }
    }
    lineEnded() {
        this.timer.stop();
    }
    bubbleEnded() {
        this.kill();
        this.emit(`sequence-${this.id}`);
    }
}
