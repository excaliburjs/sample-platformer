import * as ex from 'excalibur';
import { botRedSpriteSheet, Resources, npcSprite, tileSize } from './resources';
import { Bot } from './bot';

export class NPC extends ex.Actor {
    public onGround = true;
    public talk = false;
    public hurt = false;
    public hurtTime: number = 0;
    constructor(x: number, y: number) {
        super({
            pos: new ex.Vector(x*tileSize, y*tileSize),
            anchor: new ex.Vector(0.5,1),
            collisionType: ex.CollisionType.Passive,
            collisionGroup: ex.CollisionGroupManager.groupByName("enemy"),
            collider: ex.Shape.Box(32, 50, new ex.Vector(0.5,1))
        });
    }

    // OnInitialize is called before the 1st actor update
    onInitialize(engine: ex.Engine) {
        // Initialize actor

        // Set the z-index to be behind everything
        this.z = -1;

        // Setup visuals
        const hurtleft = ex.Animation.fromSpriteSheet(botRedSpriteSheet, [0, 1, 0, 1, 0, 1], 150);
        hurtleft.scale = new ex.Vector(2, 2);

        const hurtright = ex.Animation.fromSpriteSheet(botRedSpriteSheet, [0, 1, 0, 1, 0, 1], 150);
        hurtright.scale = new ex.Vector(2, 2);
        hurtright.flipHorizontal = true;

        const idle = ex.Animation.fromSpriteSheet(botRedSpriteSheet, [2, 3], 800);
        idle.scale = new ex.Vector(2, 2);

        const left = ex.Animation.fromSpriteSheet(botRedSpriteSheet, [3, 4, 5, 6, 7], 100);
        left.scale = new ex.Vector(2, 2);

        const right = ex.Animation.fromSpriteSheet(botRedSpriteSheet, [3, 4, 5, 6, 7], 100);
        right.scale = new ex.Vector(2, 2);
        right.flipHorizontal = true;

        // Register drawings
        this.graphics.add("hurtleft", hurtleft);
        this.graphics.add("hurtright", hurtright);
        this.graphics.add("idle", idle);
        this.graphics.add("left", left);
        this.graphics.add("right", right);

        // Setup patroling behavior

        // For the test harness to be predicable
        if (!(window as any).__TESTING) {
            this.actions.delay(1000)
                        .repeatForever(ctx => ctx
                            .moveBy(100, 0, 20)
                            .moveBy(-100, 0, 20));
        }
        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
        this.on('collisionend', (evt) => this.onCollisionEnd(evt));


        // Custom draw after local tranform, draws word bubble
        this.graphics.onPostDraw = (ctx) => {
            if (this.talk) {
                npcSprite.draw(ctx, -10, -100);
            }
        }

    }

    onCollisionStart(evt: ex.CollisionStartEvent) {
        if (evt.other instanceof Bot){
            this.talk = true;
        }
    }

    onCollisionEnd(evt: ex.CollisionEndEvent) {
        if (evt.other instanceof Bot){
            this.talk = false;
        }
    }

    onPostUpdate(engine: ex.Engine, delta: number) {
        if (this.vel.x < 0) {
            this.graphics.use("left");
        }
        if (this.vel.x > 0) {
            this.graphics.use("right");
        }
        if (this.vel.x === 0) {
            this.graphics.use("idle")
        }
    }
}