import * as ex from "excalibur";
import { loader } from "./resources";
import { Level } from "./level";

const GRAVITY_PX_PER_S = new ex.Vector(0, 800);
ex.Physics.acc = GRAVITY_PX_PER_S;

const game = new ex.Engine({
  backgroundColor: ex.Color.fromHex("#5fcde4"),
  width: 600,
  height: 400,
  antialiasing: false,
});

const level = new Level();
game.add("level", level);
game.goToScene("level");

game.start(loader);
