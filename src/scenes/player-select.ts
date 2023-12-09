import * as ex from 'excalibur';
import { Resources, boy, girl } from '../resources';
import { stats } from '../stats';
import { iCharacter } from '../icharacter';


class SelectorButton extends ex.ScreenElement {
    public character;

    constructor(x:number, y:number, sprites: iCharacter) {
        super({
            x: x,
            y: y,
            anchor: ex.vec(0.5,1),
        });
        this.character = sprites;
    }
    onInitialize() {
        const idle = ex.Animation.fromSpriteSheet(this.character.idle, [0, 1,2,3,4,5,6,7,8,9], 80);
        idle.scale = new ex.Vector(0.25, 0.25);
        this.graphics.add('idle', idle)

        const run = ex.Animation.fromSpriteSheet(this.character.run, [0, 1,2,3,4,5,6,7,8,9], 80);
        run.scale = new ex.Vector(0.25, 0.25);

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

class TextBubble extends ex.ScreenElement {
    timer: ex.Timer;
    line: number = 0;
    index: number = 1;
    textGraph: ex.Text;

    constructor(engine: ex.Engine, x:number, y:number, public maxWidth:number, public maxHeight:number, public texts: string[]) {
        super({
            x: x,
            y: y,
            anchor: ex.vec(0,0),
        });
        this.textGraph = new ex.Text({
            text:texts[this.line][0], 
            maxWidth:this.maxWidth,
            font: new ex.Font({
                quality: 4,
                size: 20,
                unit: ex.FontUnit.Px
            })
        });
        this.timer = new ex.Timer({
            fcn: () => this.timerEvent(),
            repeats: true,
            interval: 100,            
        });
        engine.currentScene.addTimer(this.timer);
    }
    timerEvent() {
        Resources.jump.play(.1);
        this.textGraph.text = this.texts[this.line].substring(0,this.index);
        this.index+=1;
        if (this.index==this.texts[this.line].length+1) {
            this.timer.stop();
        }
    }
    onInitialize() {
        this.addChild(new TextChild(0,0,this.textGraph));
        const poly = new ex.Rectangle({
            width:this.maxWidth, 
            height:this.maxHeight,
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
                this.textGraph.text = ""
                this.timer.start();
            }
        }
    }
}

export class PlayerSelect extends ex.Scene {
    constructor() {
        super();
    }

    onInitialize(engine: ex.Engine) {
        engine.add(new SelectorButton(engine.drawWidth/2 + 100, 150, girl));
        engine.add(new SelectorButton(engine.drawWidth/2 - 100, 150, boy));

        const bubble = new TextBubble(engine, 10, 200, engine.drawWidth-20, 150, 
            [
                "Hoi, ik ben Alan.", 
                "En ik ben Ada.", 
                "Jij mag ons door het doolhof helpen door te programmeren.\nMaar wees niet bang! Daar kunnen wij jou bij helpen!", 
                "Maar eerst mag je kiezen met wie je wilt spelen."
            ]);
        engine.add(bubble);

        // For the test harness to be predicable
        // if (!(window as any).__TESTING) {
        //     // Create camera strategy
        //     this.camera.clearAllStrategies();
        //     this.camera.strategy.elasticToActor(actor, 0.05, 0.1);
        // }
    }
}