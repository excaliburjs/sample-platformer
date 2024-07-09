import { Color, CrossFade, DisplayMode, Engine, FadeInOut } from "excalibur";
import { loader } from "./resources";
import { Level } from "./level";
import "./physics";
import { OtherLevel } from "./other-level";

const game = new Engine({
  backgroundColor: Color.fromHex("#5fcde4"),
  width: 600,
  height: 400,
  pixelRatio: 4,
  pixelArt: true,
  displayMode: DisplayMode.FitScreenAndFill,
  fixedUpdateFps: 60,
  scenes: {
    main: Level,
    other: { scene: OtherLevel, transitions: { in: new CrossFade({duration: 1000})}}
  }
});

await game.start("main", {
  loader,
  inTransition: new FadeInOut({direction: 'in', duration: 1000, color: Color.ExcaliburBlue})
});

