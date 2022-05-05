import * as ex from "excalibur";
import { tilemapSpriteSheet } from "./resources";

export class NPC extends ex.Actor {
  public onGround = true;
  public hurt = false;
  public hurtTime: number = 0;
  constructor(x: number, y: number) {
    super({
      pos: new ex.Vector(x, y),
      collisionType: ex.CollisionType.Active,
      collisionGroup: ex.CollisionGroupManager.groupByName("player"),
      collider: ex.Shape.Box(21, 21, ex.Vector.Half, ex.vec(0, 3)),
    });
  }

  // OnInitialize is called before the 1st actor update
  onInitialize() {
    // Initialize actor

    // Set the z-index to be behind everything
    this.z = -1;

    // Setup visuals
    const hurtleft = ex.Animation.fromSpriteSheet(
      tilemapSpriteSheet,
      [0, 1, 0, 1, 0, 1],
      150
    );

    const hurtright = ex.Animation.fromSpriteSheet(
      tilemapSpriteSheet,
      [0, 1, 0, 1, 0, 1],
      150
    );
    hurtright.flipHorizontal = true;

    const idle = ex.Animation.fromSpriteSheet(tilemapSpriteSheet, [2, 3], 800);

    const left = ex.Animation.fromSpriteSheet(
      tilemapSpriteSheet,
      [3, 4, 5, 6, 7],
      100
    );

    const right = ex.Animation.fromSpriteSheet(
      tilemapSpriteSheet,
      [3, 4, 5, 6, 7],
      100
    );
    right.flipHorizontal = true;

    // Register drawings
    this.graphics.add("hurtleft", hurtleft);
    this.graphics.add("hurtright", hurtright);
    this.graphics.add("idle", idle);
    this.graphics.add("left", left);
    this.graphics.add("right", right);

    // Setup patroling behavior
    this.actions
      .delay(1000)
      .repeatForever((ctx) => ctx.moveBy(100, 0, 20).moveBy(-100, 0, 20));
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
