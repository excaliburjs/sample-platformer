import * as ex from "excalibur";

export class Floor extends ex.Actor {
  constructor(x: number, y: number, width: number, height: number) {
    super({
      name: "Floor",
      pos: new ex.Vector(x, y),
      scale: new ex.Vector(2, 2),
      anchor: ex.Vector.Zero,
      collider: ex.Shape.Box(width, height, ex.Vector.Zero),
      collisionType: ex.CollisionType.Fixed,
      collisionGroup: ex.CollisionGroupManager.groupByName("floor"),
    });
  }
}
