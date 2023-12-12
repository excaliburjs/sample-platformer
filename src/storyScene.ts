import * as ex from 'excalibur';
import { stats } from './stats';
import { TextBubble } from './textBubble';

export interface iSceneNode {
    thisScene: string;
    nextScene: string;
}

export class StoryScene extends ex.Scene {
    public storyIndex: number = 0;

    onInitializeStory(engine: ex.Engine)
    { }

    onInitialize(engine: ex.Engine) {
        this.storyIndex = 0;
        this.onInitializeStory(engine);
        // For the test harness to be predicable
        // if (!(window as any).__TESTING) {
        //     // Create camera strategy
        //     this.camera.clearAllStrategies();
        //     this.camera.strategy.elasticToActor(actor, 0.05, 0.1);
        // }
    }
    onPreUpdate(engine: ex.Engine, delta: number) {
        if(this.storyIndex==0) {
            if(engine.input.keyboard.wasPressed(ex.Input.Keys.Space) || engine.input.keyboard.wasPressed(ex.Input.Keys.Right)) {
                stats.nextScene = true;
            }
        }
    }
}


export class BeforeLevelScene extends StoryScene {

    protected text: string[] = [];

    onInitializeStory(engine: ex.Engine) {
        this.storyIndex = 1;
        const actor = new ex.Actor({x:250, y:500, anchor: ex.vec(0.5,1)});
        const idle = ex.Animation.fromSpriteSheet(stats.character.idle, [0,1,2,3,4,5,6,7,8,9], 80);
        idle.scale = new ex.Vector(1,1);
        actor.graphics.use(idle);
        engine.add(actor);
        const bubble = new TextBubble(
            this, 
            {x:10, y:engine.drawHeight-80, maxWidth:engine.drawWidth-20, maxHeight:80}, 
            this.text
        );
        engine.add(bubble);
    }
}