import * as ex from 'excalibur';
import { boyIdleSpriteSheet, boyRunSpriteSheet, girlIdleSpriteSheet, girlRunSpriteSheet } from '../resources';
import { stats } from '../stats';


class GirlButton extends ex.ScreenElement {
    constructor(x:number, y:number) {
        super({
            x: x,
            y: y,
            anchor: ex.vec(0.5,0),
          })
    }
    onInitialize() {
        const idle = ex.Animation.fromSpriteSheet(girlIdleSpriteSheet, [0, 1,2,3,4,5,6,7,8,9], 80);
        idle.scale = new ex.Vector(0.25, 0.25);
        this.graphics.add('idle', idle)

        const run = ex.Animation.fromSpriteSheet(girlRunSpriteSheet, [0, 1,2,3,4,5,6,7,8,9], 80);
        run.scale = new ex.Vector(0.25, 0.25);

        this.graphics.add('run', run)
        this.graphics.use("idle");

        this.on('pointerup', () => {
            stats.character = "girl";
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

class BoyButton extends ex.ScreenElement {
    constructor(x:number, y:number) {
        super({
            x: x,
            y: y,
            anchor: ex.vec(0.5,0),
          })
    }
    onInitialize() {
        const idle = ex.Animation.fromSpriteSheet(boyIdleSpriteSheet, [0, 1,2,3,4,5,6,7,8,9], 80);
        idle.scale = new ex.Vector(0.25, 0.25);
        this.graphics.add('idle', idle)

        const run = ex.Animation.fromSpriteSheet(boyRunSpriteSheet, [0, 1,2,3,4,5,6,7,8,9], 80);
        run.scale = new ex.Vector(0.25, 0.25);

        this.graphics.add('run', run)
        this.graphics.use("idle");

        this.on('pointerup', () => {
            stats.character = "boy";
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
        const label = new ex.Label({
            text: "Wie ben je?"
        });
        label.pos = ex.vec(engine.drawWidth/2 - label.getTextWidth()/2, 100);
        label.font.quality = 4;
        label.font.size = 20;
        label.font.unit = ex.FontUnit.Px;
        label.transform.coordPlane = ex.CoordPlane.Screen;
        label.color = ex.Color.Black;
        engine.add(label);

        engine.add(new GirlButton(engine.drawWidth/2 + 100, 150));
        engine.add(new BoyButton(engine.drawWidth/2 - 100, 150));

        // For the test harness to be predicable
        // if (!(window as any).__TESTING) {
        //     // Create camera strategy
        //     this.camera.clearAllStrategies();
        //     this.camera.strategy.elasticToActor(actor, 0.05, 0.1);
        // }
    }
}