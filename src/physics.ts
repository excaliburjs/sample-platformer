import * as ex from "excalibur";

export const collisionGroups = {
  enemy: () => ex.CollisionGroupManager.groupByName("enemy"),
  player: () => ex.CollisionGroupManager.groupByName("player"),
};

export const makeCharacterCollider = () =>
  ex.Shape.Box(21, 21, ex.Vector.Half, ex.vec(0, 0));
