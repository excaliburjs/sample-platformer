import {Actor, Animation, CollisionGroupManager, Engine, Shape, Vector, CollisionType, vec} from 'excalibur';
import { botRedSpriteSheet, npcSprite } from './resources';

export class NPC extends Actor {
    public onGround = true;
    public hurt = false;
    public hurtTime: number = 0;
    constructor(x: number, y: number) {
        super({
            pos: vec(x, y),
            collisionType: CollisionType.Active,
            collisionGroup: CollisionGroupManager.groupByName("player"),
            collider: Shape.Box(32, 50, Vector.Half, vec(0, 3))
        });
    }

    // OnInitialize is called before the 1st actor update
    onInitialize(engine: Engine) {
        // Initialize actor

        // Set the z-index to be behind everything
        this.z = -1;

        // Setup visuals
        const hurtleft = Animation.fromSpriteSheet(botRedSpriteSheet, [0, 1, 0, 1, 0, 1], 150);
        hurtleft.scale = vec(2, 2);

        const hurtright = Animation.fromSpriteSheet(botRedSpriteSheet, [0, 1, 0, 1, 0, 1], 150);
        hurtright.scale = vec(2, 2);
        hurtright.flipHorizontal = true;

        const idle = Animation.fromSpriteSheet(botRedSpriteSheet, [2, 3], 800);
        idle.scale = vec(2, 2);

        const left = Animation.fromSpriteSheet(botRedSpriteSheet, [3, 4, 5, 6, 7], 100);
        left.scale = vec(2, 2);

        const right = Animation.fromSpriteSheet(botRedSpriteSheet, [3, 4, 5, 6, 7], 100);
        right.scale = vec(2, 2);
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


        // Custom draw after local tranform, draws word bubble
        this.graphics.onPostDraw = (ctx) => {
            npcSprite.draw(ctx, -10, -100);
        }

    }

    onPostUpdate(engine: Engine, delta: number) {
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