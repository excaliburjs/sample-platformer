import * as ex from 'excalibur';
import { botRedSpriteSheet, girlIdleSpriteSheet, girlRunSpriteSheet, npcSprite, tileSize } from './resources';
import { Player } from './player';

export class NPC extends ex.Actor {
    public onGround = true;
    public talk = false;
    public hurt = false;
    public hurtTime: number = 0;
    constructor(x: number, y: number) {
        super({
            pos: new ex.Vector(x*tileSize, y*tileSize+3),
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
        const idle = ex.Animation.fromSpriteSheet(girlIdleSpriteSheet, [0, 1,2,3,4,5,6,7,8,9], 80);
        idle.scale = new ex.Vector(0.125, 0.125);

        const left = ex.Animation.fromSpriteSheet(girlRunSpriteSheet, [0, 1, 2, 3, 4, 5, 6, 7], 80);
        left.scale = new ex.Vector(0.125, 0.125);
        left.flipHorizontal = true;

        const right = ex.Animation.fromSpriteSheet(girlRunSpriteSheet, [0, 1, 2, 3, 4, 5, 6, 7], 80);
        right.scale = new ex.Vector(0.125, 0.125);

        // Register drawings
        this.graphics.add("idle", idle);
        this.graphics.add("left", left);
        this.graphics.add("right", right);

        // Setup patroling behavior

        // For the test harness to be predicable
        if (!(window as any).__TESTING) {
            this.actions.delay(1000)
                        .repeatForever(ctx => ctx
                            .moveBy(200, 0, 100)
                            .delay(1000)
                            .moveBy(-200, 0, 100)
                            .delay(1000));
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
        if (evt.other instanceof Player){
            this.talk = true;
        }
    }

    onCollisionEnd(evt: ex.CollisionEndEvent) {
        if (evt.other instanceof Player){
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