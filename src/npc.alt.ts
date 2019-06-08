import * as ex from "../Excalibur/build/dist/excalibur.js";
import { botRedSpriteSheet, npcSprite } from "./resources";

const NPC = ({ x, y }: { x: number; y: number }) => {
  const [pos, setPos] = ex.Actor.usePos(x, y);
  const [zIndex, setZIndex] = ex.Actor.useZIndex(-1);
  const [onGround, setOnGround] = ex.useState(false);
  const [hurt, setHurt] = ex.useState(false);
  const [hurtTime, setHurtTime] = ex.useState(0);
  
  ex.Actor.useCollision({
    type: ex.CollisionType.Active,
    shape: ex.Shape.Box(32, 50),
    offset: new ex.Vector(0, 3),
    group: ex.CollisionGroupManager.groupByName("player")
  });

  ex.Drawing.useAnimation(ctx => {
    const hurtleft = ctx.getAnimationByIndices(
      botRedSpriteSheet,
      [0, 1, 0, 1, 0, 1],
      150
    );
    hurtleft.scale = new ex.Vector(2, 2);

    return hurtleft;
  });

  ex.Drawing.useAnimation(ctx => {
    const hurtright = ctx.getAnimationByIndices(
      botRedSpriteSheet,
      [0, 1, 0, 1, 0, 1],
      150
    );
    hurtright.scale = new ex.Vector(2, 2);
    hurtright.flipHorizontal = true;

    return hurtright;
  });

  const [idleDrawing, setIdleAnim] = ex.Drawing.useAnimation(ctx => {
    const idle = ctx.getAnimationByIndices(botRedSpriteSheet, [2, 3], 800);
    idle.scale = new ex.Vector(2, 2);

    return idle;
  });

  const [leftDrawing, setLeftAnim] = ex.Drawing.useAnimation(ctx => {
    const left = ctx.getAnimationByIndices(
      botRedSpriteSheet,
      [3, 4, 5, 6, 7],
      100
    );
    left.scale = new ex.Vector(2, 2);

    return left;
  });

  const [rightDrawing, setRightAnim] = ex.Drawing.useAnimation(ctx => {
    const right = ctx.getAnimationByIndices(
      botRedSpriteSheet,
      [3, 4, 5, 6, 7],
      100
    );
    right.scale = new ex.Vector(2, 2);
    right.flipHorizontal = true;

    return right;
  });

  ex.Actor.useActions(actions =>
    actions
      .moveBy(100, 0, 20)
      .moveBy(-100, 0, 20)
      .repeatForever()
  );

  const [vel, setVel] = ex.Motion.useVel(0);

  ex.Engine.useUpdate(ctx => {
    if (vel.x < 0) {
      setLeftAnim();
    }
    if (vel.x > 0) {
      setRightAnim();
    }
    if (vel.x === 0) {
      setIdleAnim();
    }
  });

  ex.Engine.useDraw(ctx => {
    npcSprite.draw(ctx, -10, -100);
  })
};

export default NPC;