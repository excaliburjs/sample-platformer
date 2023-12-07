import * as ex from 'excalibur';
import { baddieSpriteSheet, Resources, tileSize } from "./resources";
import { Player } from './player';
import { stats } from './stats';

export class Baddie extends ex.Actor {
    constructor(x: number, y: number, public left: number, public right: number) {
        super({
            name: 'Baddie',
            pos: new ex.Vector(x*tileSize, y*tileSize),
            anchor: new ex.Vector(0.5,1),
            collisionGroup: ex.CollisionGroupManager.groupByName("enemy"),
            collisionType: ex.CollisionType.Active,
            collider: ex.Shape.Box(32, 50, new ex.Vector(0.5,1)) 
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
                            .moveTo(this.left * tileSize, this.pos.y, 100)
                            .moveTo(this.right * tileSize, this.pos.y, 100));
        }

        // Handle being stomped by the player
        this.on('postcollision', (evt) => this.onPostCollision(evt));
    }

    onPostCollision(evt: ex.PostCollisionEvent) {
        if (evt.other instanceof Player && evt.side === ex.Side.Top && !evt.other.hurt) {
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