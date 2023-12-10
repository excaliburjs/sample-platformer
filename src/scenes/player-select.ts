import * as ex from 'excalibur';
import { boy, girl } from '../resources';
import { stats } from '../stats';
import { iCharacter } from '../icharacter';
import { TextBubble } from '../textBubble';


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

export class PlayerSelect extends ex.Scene {
    constructor() {
        super();
    }

    onInitialize(engine: ex.Engine) {
        engine.add(new SelectorButton(engine.drawWidth/2 + 100, 150, girl));
        engine.add(new SelectorButton(engine.drawWidth/2 - 100, 150, boy));

        const bubble = new TextBubble(engine, {x:10, y:200, maxWidth:engine.drawWidth-20, maxHeight:150}, 
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