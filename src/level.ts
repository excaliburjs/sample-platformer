import { Scene } from "excalibur";
import { Baddie } from "./baddie";
import { Player } from "./player";
import { NPC } from "./npc";
import { initializeLevelMap, Resources } from "./resources";
import { Config } from "./config";
import { PatrolSystem } from "./behaviors/patrol";

export class Level extends Scene {
  constructor() {
    super();

    this.world.add(new PatrolSystem());
  }

  onInitialize() {
    const { playerObject, npcObjects, baddieObjects } =
      initializeLevelMap(this);

    const player = new Player(playerObject.x, playerObject.y);
    this.add(player);

    this.camera.clearAllStrategies();
    this.camera.strategy.elasticToActor(
      player,
      Config.cameraElasticity,
      Config.cameraFriction
    );

    for (const npcObject of npcObjects) {
      this.add(
        new NPC(
          npcObject.x,
          npcObject.y,
          npcObject.getProperty<number>("patrol_left")?.value ?? 0,
          npcObject.getProperty<number>("patrol_right")?.value ?? 0
        )
      );
    }

    for (const baddieObject of baddieObjects) {
      this.add(
        new Baddie(
          baddieObject.x,
          baddieObject.y,
          baddieObject.getProperty<number>("patrol_left")?.value ?? 0,
          baddieObject.getProperty<number>("patrol_right")?.value ?? 0
        )
      );
    }
  }
}
