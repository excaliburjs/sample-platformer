import * as ex from 'excalibur';
import { Resources } from './resources';

class TextChild extends ex.ScreenElement {
    constructor(x: number, y: number, public text: ex.Text) {
        super({
            x: x,
            y: y-text.localBounds.top,
            anchor: ex.Vector.Zero
        });
    }
    onInitialize() {
        this.graphics.add('text', this.text);
        this.graphics.show('text');
    }
}

interface Bubble {
    x:number;
    y:number;
    maxWidth:number;
    maxHeight:number;
};

export class TextBubble extends ex.ScreenElement {
    timer: ex.Timer;
    line: number = 0;
    index: number = 1;
    textGraph: ex.Text;
    pause: number = 0;

    constructor(engine: ex.Engine, public bubble: Bubble, public texts: string[]) {
        super({
            x: bubble.x,
            y: bubble.y,
            anchor: ex.vec(0,0),
        });
        this.textGraph = new ex.Text({
            text:texts[this.line][0], 
            maxWidth:bubble.maxWidth,
            font: new ex.Font({
                quality: 4,
                size: 20,
                unit: ex.FontUnit.Px
            })
        });
        this.timer = new ex.Timer({
            fcn: () => this.timerEvent(),
            repeats: true,
            interval: 50,            
        });
        engine.currentScene.addTimer(this.timer);
    }
    timerEvent() {
        if (this.pause!=0) {
            this.pause -= 1;
        } else {
            if (/^[a-zA-Z0-9]+$/.test(this.texts[this.line][this.index-1])) {
                Resources.jump.play(.1);
            } else if (/^[^ a-zA-Z0-9\n]+$/.test(this.texts[this.line][this.index-1])) {
                this.pause = 2;
            } 
            this.textGraph.text = this.texts[this.line].substring(0,this.index);
            this.index+=1;
            if (this.index==this.texts[this.line].length+1) {
                this.timer.stop();
            }
        }
    }
    onInitialize() {
        this.addChild(new TextChild(0,0,this.textGraph));
        const poly = new ex.Rectangle({
            width:this.bubble.maxWidth, 
            height:this.bubble.maxHeight,
            color: ex.Color.White
        });
        this.graphics.add('poly', poly);
        this.graphics.show('poly');
        this.timer.start();
        //this.scale = ex.vec(2,2);
    }
    onPreUpdate(engine: ex.Engine, delta: number) {
        if(engine.input.keyboard.wasPressed(ex.Input.Keys.Space)) {
            if (this.index!=this.texts[this.line].length+1) {
                this.textGraph.text = this.texts[this.line];
                this.index=this.texts[this.line].length+1;
                this.timer.stop();
            } else if (this.line < this.texts.length-1) {
                this.line += 1;
                this.index = 0;
                this.pause = 0;
                this.textGraph.text = ""
                this.timer.start();
            }
        }
    }
}
