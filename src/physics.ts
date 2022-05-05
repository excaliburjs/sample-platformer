import * as ex from "excalibur";

const GRAVITY_PX_PER_S = new ex.Vector(0, 800);
ex.Physics.acc = GRAVITY_PX_PER_S;

ex.CollisionGroupManager.create("player");
ex.CollisionGroupManager.create("enemy");

export const collisionGroups = {
  enemy: ex.CollisionGroupManager.groupByName("enemy"),
  player: ex.CollisionGroupManager.groupByName("player"),
};

export const makeCharacterCollider = (bottom: number = 0) =>
  ex.Shape.Box(21, 21, ex.Vector.Half, ex.vec(0, bottom));
