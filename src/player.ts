import * as ex from "excalibur";
import { tilemapSpriteSheet, Resources } from "./resources";
import { Baddie } from "./baddie";

export class Player extends ex.Actor {
  public onGround = true;
  public jumped = false;
  public hurt = false;
  public hurtTime: number = 0;
  constructor(x: number, y: number) {
    super({
      name: "Player",
      pos: new ex.Vector(x, y),
      collisionType: ex.CollisionType.Active,
      collisionGroup: ex.CollisionGroupManager.groupByName("player"),
      collider: ex.Shape.Box(21, 21, ex.Vector.Half, ex.vec(0, 0)),
    });
  }

  onInitialize() {
    const hurtleft = tilemapSpriteSheet.getSprite(23, 0)!;
    hurtleft.flipHorizontal = true;

    const hurtright = tilemapSpriteSheet.getSprite(23, 0)!;
    const idle = tilemapSpriteSheet.getSprite(19, 0)!;

    const left = ex.Animation.fromSpriteSheet(
      tilemapSpriteSheet,
      [28, 29],
      100
    );
    left.flipHorizontal = true;

    const right = ex.Animation.fromSpriteSheet(
      tilemapSpriteSheet,
      [28, 29],
      100
    );

    this.graphics.add("hurtleft", hurtleft);
    this.graphics.add("hurtright", hurtright);
    this.graphics.add("idle", idle);
    this.graphics.add("left", left);
    this.graphics.add("right", right);

    this.on("postcollision", (evt) => this.onPostCollision(evt));
  }

  onPostCollision(evt: ex.PostCollisionEvent) {
    // Bot has collided with it's Top of another collider

    if (evt.side === ex.Side.Bottom) {
      this.onGround = true;
    }

    // Bot has collided on the side, display hurt animation
    if (
      (evt.side === ex.Side.Left || evt.side === ex.Side.Right) &&
      evt.other instanceof Baddie
    ) {
      if (this.vel.x < 0 && !this.hurt) {
        this.graphics.use("hurtleft");
      }
      if (this.vel.x >= 0 && !this.hurt) {
        this.graphics.use("hurtright");
      }
      if (!this.hurt) {
        Resources.hit.play(0.1);
      }

      this.hurt = true;
      this.hurtTime = 1000;
    }
  }

  // After main update, once per frame execute this code
  onPreUpdate(engine: ex.Engine, delta: number) {
    // If hurt, count down
    if (this.hurtTime >= 0 && this.hurt) {
      this.hurtTime -= delta;
      if (this.hurtTime < 0) {
        this.hurt = false;
      }
    }

    // Reset x velocity
    this.vel.x = 0;

    // Player input
    if (engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
      this.vel.x = -150;
    }

    if (engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
      this.vel.x = 150;
    }

    if (engine.input.keyboard.wasPressed(ex.Input.Keys.Up) && this.onGround) {
      this.vel.y = -300;
      this.onGround = false;
      Resources.jump.play(0.1);
    }

    // Change animation based on velocity
    if (!this.hurt) {
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
}
