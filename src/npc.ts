import * as ex from "excalibur";
import { tilemapSpriteSheet } from "./resources";

export class NPC extends ex.Actor {
  public onGround = true;
  public hurt = false;
  public hurtTime: number = 0;
  constructor(
    x: number,
    y: number,
    public patrolLeft: number,
    public patrolRight: number
  ) {
    super({
      pos: new ex.Vector(x, y),
      collisionType: ex.CollisionType.Active,
      collisionGroup: ex.CollisionGroupManager.groupByName("player"),
      collider: ex.Shape.Box(21, 21, ex.Vector.Half, ex.vec(0, 0)),
    });
  }

  // OnInitialize is called before the 1st actor update
  onInitialize() {
    // Initialize actor

    // Set the z-index to be behind everything
    this.z = -1;

    // Setup visuals
    const idle = tilemapSpriteSheet.getSprite(28, 13)!;

    const left = ex.Animation.fromSpriteSheet(
      tilemapSpriteSheet,
      [418, 419],
      200
    );

    const right = ex.Animation.fromSpriteSheet(
      tilemapSpriteSheet,
      [418, 419],
      200
    );
    right.flipHorizontal = true;

    // Register drawings
    this.graphics.add("idle", idle);
    this.graphics.add("left", left);
    this.graphics.add("right", right);

    // Setup patroling behavior
    const initialPos = this.pos.clone();
    this.actions.delay(1000).repeatForever((ctx) =>
      ctx
        .moveTo(initialPos.x + this.patrolLeft, initialPos.y, 40)
        .delay(1000)
        .moveTo(initialPos.x + this.patrolRight, initialPos.y, 40)
        .delay(1000)
    );
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
