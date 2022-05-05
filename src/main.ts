import { Color, Engine } from "excalibur";
import { loader } from "./resources";
import { Level } from "./level";
import "./physics";

const game = new Engine({
  backgroundColor: Color.fromHex("#5fcde4"),
  width: 600,
  height: 400,
  antialiasing: false,
});

await game.start(loader);

const level = new Level();
game.add("level", level);
game.goToScene("level");
