import * as ex from "excalibur";
import { tilemapSpriteSheet, Resources } from "./resources";
import { Player } from "./player";

export class Baddie extends ex.Actor {
  constructor(
    x: number,
    y: number,
    public patrolLeft: number,
    public patrolRight: number
  ) {
    super({
      name: "Baddie",
      pos: new ex.Vector(x, y),
      collisionGroup: ex.CollisionGroupManager.groupByName("enemy"),
      collisionType: ex.CollisionType.Active,
      collider: ex.Shape.Box(21, 21, ex.Vector.Half, ex.vec(0, -1)),
    });
  }

  // OnInitialize is called before the 1st actor update
  onInitialize(engine: ex.Engine) {
    // Initialize actor

    // Setup visuals
    const left = ex.Animation.fromSpriteSheet(
      tilemapSpriteSheet,
      [229, 230, 231],
      200
    );
    left.flipHorizontal = true;
    const right = ex.Animation.fromSpriteSheet(
      tilemapSpriteSheet,
      [229, 230, 231],
      200
    );

    const dead = tilemapSpriteSheet.getSprite(22, 7)!;

    // Register animation
    this.graphics.add("left", left);
    this.graphics.add("right", right);
    this.graphics.add("dead", dead);
    this.graphics.use("left");

    // Setup patroling behavior
    const startingPos = this.pos.clone();

    this.actions.delay(1000).repeatForever((ctx) =>
      ctx
        .moveTo(startingPos.x + this.patrolLeft, startingPos.y, 100)
        .delay(1000)
        .moveTo(startingPos.x + this.patrolRight, startingPos.y, 100)
        .delay(1000)
    );

    // Handle being stomped by the player
    this.on("postcollision", (evt) => this.onPostCollision(evt));
  }

  onPostCollision(evt: ex.PostCollisionEvent) {
    if (evt.other instanceof Player && evt.side === ex.Side.Top) {
      Resources.gotEm.play(0.1);
      // Clear patrolling
      this.actions.clearActions();
      // Remove ability to collide
      this.body.collisionType = ex.CollisionType.PreventCollision;

      // Launch into air with rotation
      this.vel = new ex.Vector(0, -300);
      this.acc = ex.Physics.acc;
      this.angularVelocity = 2;
      this.graphics.use("dead");
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
