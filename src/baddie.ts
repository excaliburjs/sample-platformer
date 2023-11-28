import * as ex from 'excalibur';
import { baddieSpriteSheet, Resources } from "./resources";
import { Bot } from './bot';
import { stats } from './stats';

export class Baddie extends ex.Actor {
    constructor(x: number, y: number, public dir: number) {
        super({
            name: 'Baddie',
            pos: new ex.Vector(x, y),
            collisionGroup: ex.CollisionGroupManager.groupByName("enemy"),
            collisionType: ex.CollisionType.Active,
            collider: ex.Shape.Box(32, 50, ex.Vector.Half, ex.vec(0, -1)) 
        });
    }

    // OnInitialize is called before the 1st actor update
    onInitialize(engine: ex.Engine) {
        // Initialize actor

        // Setup visuals
        const left = ex.Animation.fromSpriteSheet(baddieSpriteSheet, [2, 3, 4, 5], 100);
        left.scale = new ex.Vector(2, 2);
        const right = ex.Animation.fromSpriteSheet(baddieSpriteSheet, [2, 3, 4, 5], 100);
        right.scale = new ex.Vector(2, 2);
        right.flipHorizontal = true;

        // Register animation
        this.graphics.add("left", left)
        this.graphics.add("right", right);
        this.graphics.use("left");

        if ((window as any).__TESTING) {
            left.pause();
        }

        // Setup patroling behavior

        // For the test harness to be predicable
        if (!(window as any).__TESTING) {
            this.actions.delay(1000)
                        .repeatForever(ctx => ctx
                            .moveBy(400 * this.dir, 0, 100)
                            .moveBy(-400 * this.dir, 0, 100));
        }

        // Handle being stomped by the player
        this.on('postcollision', (evt) => this.onPostCollision(evt));
    }

    onPostCollision(evt: ex.PostCollisionEvent) {
        if (evt.other instanceof Bot && evt.side === ex.Side.Top && !evt.other.hurt) {
            Resources.gotEm.play(.1);
            // Clear patrolling
            this.actions.clearActions();
            // Remove ability to collide
            this.body.collisionType = ex.CollisionType.PreventCollision;

            // Launch into air with rotation
            this.vel = new ex.Vector(0, -300);
            this.acc = ex.Physics.acc;
            this.angularVelocity = 2;
            // Update stats
            stats.score += 1;
            if(stats.score==2) {
                stats.gameOver = true;
            }
        }
    }

    // Change animation based on velocity 
    onPostUpdate() {
        if (this.vel.x < 0) {
            this.graphics.use("left");
        } else if (this.vel.x > 0) {
            this.graphics.use("right");
        }
    }
    
}