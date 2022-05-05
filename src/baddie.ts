import * as ex from "excalibur";
import { Resources, BaddieGraphics } from "./resources";
import { Player } from "./player";
import { collisionGroups, makeCharacterCollider } from "./physics";
import { Config } from "./config";
import { addPatrolToActor } from "./behaviors/patrol";

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
      collisionGroup: collisionGroups.enemy(),
      collisionType: ex.CollisionType.Active,
      collider: makeCharacterCollider(),
    });

    addPatrolToActor(this, {
      delay: Config.baddiePatrolDelay,
      speed: Config.baddiePatrolSpeed,
      from: ex.vec(x + patrolLeft, y),
      to: ex.vec(x + patrolRight, y),
    });
  }

  onInitialize() {
    this.graphics.add("left", BaddieGraphics.left);
    this.graphics.add("right", BaddieGraphics.right);
    this.graphics.add("dead", BaddieGraphics.dead);
    this.graphics.use("left");

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

  onPostUpdate(engine: ex.Engine) {
    if (this.vel.x < 0) {
      this.graphics.use("left");
    } else if (this.vel.x > 0) {
      this.graphics.use("right");
    }
  }
}
