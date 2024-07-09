import { Scene } from "excalibur";
import { Baddie } from "./baddie";
import { Player } from "./player";
import { NPC } from "./npc";
import { initializeLevelMap } from "./resources";
import { Config } from "./config";
import { PatrolSystem } from "./behaviors/patrol";
import { OneWayPlatform } from "./one-way-platform";

export class Level extends Scene {
  constructor() {
    super();

    this.world.add(PatrolSystem);
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
          npcObject.properties.get("patrol_left") as number ?? 0,
          npcObject.properties.get("patrol_right") as number ?? 0
        )
      );
    }

    for (const baddieObject of baddieObjects) {
      this.add(
        new Baddie(
          baddieObject.x,
          baddieObject.y,
          baddieObject.properties.get("patrol_left") as number ?? 0,
          baddieObject.properties.get("patrol_right") as number ?? 0
        )
      );
    }

    this.add(
      new OneWayPlatform(player.pos.x, player.pos.y - 20, 50, 5)
    )
    this.add(
      new OneWayPlatform(player.pos.x, player.pos.y - 20 - 30, 50, 5)
    )
  }
}
