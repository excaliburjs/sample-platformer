import * as ex from "excalibur";
import { TiledMapResource } from "@excaliburjs/plugin-tiled";

const jumpSound = require("../res/jump.wav");
const hitSound = require("../res/hurt.wav");
const gotEmSound = require("../res/gottem.wav");
const levelFile = require("../res/level.tmx");
const tileMapFile = require("../res/tilemap.png");

const Resources = {
  tilemap: new ex.ImageSource(tileMapFile),
  jump: new ex.Sound(jumpSound),
  hit: new ex.Sound(hitSound),
  gotEm: new ex.Sound(gotEmSound),
  level: new TiledMapResource(levelFile),
};

const loader = new ex.Loader();

const tilemapSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Resources.tilemap,
  grid: {
    columns: 30,
    rows: 30,
    spriteWidth: 21,
    spriteHeight: 21,
  },
});

for (const res in Resources) {
  loader.addResource((Resources as any)[res]);
}

export { Resources, loader, tilemapSpriteSheet };
