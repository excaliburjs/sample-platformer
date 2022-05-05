import * as ex from "excalibur";
import { TiledMapResource } from "@excaliburjs/plugin-tiled";

import jumpSound from "../res/jump.wav";
import hitSound from "../res/hurt.wav";
import gotEmSound from "../res/gottem.wav";
import levelFile from "../res/level.tmx";
import tileMapFile from "../res/tilemap.png";

export const Resources = {
  tilemap: new ex.ImageSource(tileMapFile),
  jump: new ex.Sound(jumpSound),
  hit: new ex.Sound(hitSound),
  gotEm: new ex.Sound(gotEmSound),
  level: new TiledMapResource(levelFile),
};

export const loader = new ex.Loader();

for (const res in Resources) {
  loader.addResource((Resources as any)[res]);
}

export const tilemapSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Resources.tilemap,
  grid: {
    columns: 30,
    rows: 30,
    spriteWidth: 21,
    spriteHeight: 21,
  },
});

export const BaddieGraphics = {
  left: ex.Animation.fromSpriteSheet(tilemapSpriteSheet, [229, 230, 231], 200),
  right: ex.Animation.fromSpriteSheet(tilemapSpriteSheet, [229, 230, 231], 200),
  dead: tilemapSpriteSheet.getSprite(22, 7)!,
};
BaddieGraphics.left.flipHorizontal = true;

export const PlayerGraphics = {
  idle: tilemapSpriteSheet.getSprite(19, 0)!,
  left: ex.Animation.fromSpriteSheet(tilemapSpriteSheet, [28, 29], 100),
  right: ex.Animation.fromSpriteSheet(tilemapSpriteSheet, [28, 29], 100),
};
PlayerGraphics.left.flipHorizontal = true;

export const NpcGraphics = {
  idle: tilemapSpriteSheet.getSprite(28, 13)!,
  left: ex.Animation.fromSpriteSheet(tilemapSpriteSheet, [418, 419], 200),
  right: ex.Animation.fromSpriteSheet(tilemapSpriteSheet, [418, 419], 200),
};
NpcGraphics.right.flipHorizontal = true;

export const initializeLevelMap = (scene: ex.Scene) => {
  Resources.level.addTiledMapToScene(scene);

  const gameLayer = Resources.level.data.getObjectLayerByName("Game");

  const playerObject = gameLayer.getObjectByType("Player")!;
  const npcObjects = gameLayer.getObjectsByType("NPC");

  const baddieLayer = Resources.level.data.getObjectLayerByName("Baddies");
  const baddieObjects = baddieLayer.getObjectsByType("Baddie");

  return {
    playerObject,
    npcObjects,
    baddieObjects,
  };
};
