import * as ex from "excalibur";
import { PatrolComponent } from "./behaviors/patrol";
import { Config } from "./config";
import { collisionGroups, makeCharacterCollider } from "./physics";
import { NpcGraphics } from "./resources";

export class NPC extends ex.Actor {
  constructor(
    x: number,
    y: number,
    public patrolLeft: number,
    public patrolRight: number
  ) {
    super({
      pos: new ex.Vector(x, y),
      collisionGroup: collisionGroups.player(),
      collisionType: ex.CollisionType.Active,
      collider: makeCharacterCollider(),
    });

    this.addComponent(
      new PatrolComponent({
        delay: Config.npcPatrolDelay,
        speed: Config.npcPatrolSpeed,
        from: ex.vec(x + patrolLeft, y),
        to: ex.vec(x + patrolRight, y),
      })
    );
  }

  onInitialize() {
    // Set the z-index to be behind everything
    this.z = -1;

    this.graphics.add("idle", NpcGraphics.idle);
    this.graphics.add("left", NpcGraphics.left);
    this.graphics.add("right", NpcGraphics.right);
  }

  onPostUpdate() {
    if (this.vel.x < 0) {
      this.graphics.use("left");
    }
    if (this.vel.x > 0) {
      this.graphics.use("right");
    }
    if (this.vel.x === 0) {
      this.graphics.use("idle");
    }
  }
}
