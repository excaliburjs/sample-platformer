import * as ex from "excalibur";
import { Resources, PlayerGraphics } from "./resources";
import { collisionGroups, makeCharacterCollider } from "./physics";

export class Player extends ex.Actor {
  public onGround = true;
  public jumped = false;
  constructor(x: number, y: number) {
    super({
      name: "Player",
      pos: new ex.Vector(x, y),
      collisionGroup: collisionGroups.player,
      collisionType: ex.CollisionType.Active,
      collider: makeCharacterCollider(),
    });
  }

  onInitialize() {
    this.graphics.add("idle", PlayerGraphics.idle);
    this.graphics.add("left", PlayerGraphics.left);
    this.graphics.add("right", PlayerGraphics.right);

    this.on("postcollision", (evt) => this.onPostCollision(evt));
  }

  onPostCollision(evt: ex.PostCollisionEvent) {
    if (evt.side === ex.Side.Bottom) {
      this.onGround = true;
    }
  }

  onPreUpdate(engine: ex.Engine) {
    this._handleMovement(engine);
    this._updateAnimation();
  }

  private _handleMovement(engine: ex.Engine) {
    this.vel.x = 0;

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
  }

  private _updateAnimation() {
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
