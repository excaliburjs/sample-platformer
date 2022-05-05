import * as ex from "excalibur";
import { Resources, BaddieGraphics } from "./resources";
import { Player } from "./player";
import { collisionGroups, makeCharacterCollider } from "./physics";
import { Config } from "./config";
import { PatrolComponent } from "./behaviors/patrol";

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
      collisionGroup: collisionGroups.enemy,
      collisionType: ex.CollisionType.Active,
      collider: makeCharacterCollider(-1),
    });

    this.addComponent(
      new PatrolComponent({
        delay: Config.baddiePatrolDelay,
        speed: Config.baddiePatrolSpeed,
        from: ex.vec(x + patrolLeft, y),
        to: ex.vec(x + patrolRight, y),
      })
    );
  }

  onInitialize() {
    this.graphics.add("left", BaddieGraphics.left);
    this.graphics.add("right", BaddieGraphics.right);
    this.graphics.add("dead", BaddieGraphics.dead);
    this.graphics.use("left");

    this.on("postcollision", (evt) => this.onPostCollision(evt));
    this.on("exit", () => this.kill());
  }

  onPostCollision(evt: ex.PostCollisionEvent) {
    if (evt.other instanceof Player && evt.side === ex.Side.Top) {
      Resources.gotEm.play(0.1);

      // Stop patrolling
      this.get(PatrolComponent)!.stop();

      // Remove ability to collide
      this.body.collisionType = ex.CollisionType.PreventCollision;

      // Launch into air with rotation
      this.vel = new ex.Vector(0, Config.baddieDeathSpiralVelocity);
      this.acc = ex.Physics.acc;
      this.angularVelocity = 2;
      this.graphics.use("dead");
    }
  }

  onPostUpdate() {
    if (this.vel.x < 0) {
      this.graphics.use("left");
    } else if (this.vel.x > 0) {
      this.graphics.use("right");
    }
  }
}
