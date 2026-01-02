import { baddieSpriteSheet, Resources } from "./resources";
import { Bot } from './bot';
import { 
    Actor,
    CollisionGroupManager,
    CollisionType,
    Shape,
    vec, 
    Vector,
    Engine,
    PostCollisionEvent,
    Side,
    Animation,
} from 'excalibur';

export class Baddie extends Actor {
    constructor(x: number, y: number, public dir: number) {
        super({
            name: 'Baddie',
            pos: vec(x, y),
            collisionGroup: CollisionGroupManager.groupByName("enemy"),
            collisionType: CollisionType.Active,
            collider: Shape.Box(32, 50, Vector.Half, vec(0, -1)) 
        });
    }

    // OnInitialize is called before the 1st actor update
    onInitialize(engine: Engine) {
        // Initialize actor

        // Setup visuals
        const left = Animation.fromSpriteSheet(baddieSpriteSheet, [2, 3, 4, 5], 100);
        left.scale = vec(2, 2);
        const right = Animation.fromSpriteSheet(baddieSpriteSheet, [2, 3, 4, 5], 100);
        right.scale = vec(2, 2);
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

    onPostCollision(evt: PostCollisionEvent) {
        if (evt.other.owner instanceof Bot && evt.side === Side.Top) {
            Resources.gotEm.play(.1);
            // Clear patrolling
            this.actions.clearActions();
            // Remove ability to collide
            this.body.collisionType = CollisionType.PreventCollision;

            // Launch into air with rotation
            this.vel = vec(0, -300);
            this.acc = vec(0, 800);
            this.angularVelocity = 2;
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