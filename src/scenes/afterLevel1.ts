import * as ex from 'excalibur';
import { boy, girl } from '../resources';
import { stats } from '../stats';
import { iCharacter } from '../icharacter';
import { TextBubble } from '../textBubble';

export class AfterLevel1 extends ex.Scene {
    constructor() {
        super();
    }

    onInitialize(engine: ex.Engine) {
        const bubble = new TextBubble(engine, {x:10, y:200, maxWidth:engine.drawWidth-20, maxHeight:150}, 
            [
                "Goed zo!", 
                "Je hebt de eerste opdracht goed gemaakt. Ik leef immers nog!", 
                "De volgende opdracht wordt iets moeilijker.", 
            ]);
        engine.add(bubble);

        // For the test harness to be predicable
        // if (!(window as any).__TESTING) {
        //     // Create camera strategy
        //     this.camera.clearAllStrategies();
        //     this.camera.strategy.elasticToActor(actor, 0.05, 0.1);
        // }
    }
    onPreUpdate(engine: ex.Engine, delta: number) {
        if(engine.input.keyboard.wasPressed(ex.Input.Keys.Enter)) {
            stats.nextScene = true;
        }
    }
}