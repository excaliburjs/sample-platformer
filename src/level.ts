import * as ex from "excalibur";
import { Baddie } from "./baddie";
import { Bot } from "./bot";
import { Floor } from "./floor";
import { NPC } from "./npc";
import { Resources } from "./resources";

export class Level extends ex.Scene {
  constructor() {
    super();
  }

  onInitialize(engine: ex.Engine) {
    // Create collision groups for the game
    ex.CollisionGroupManager.create("player");
    ex.CollisionGroupManager.create("enemy");
    ex.CollisionGroupManager.create("floor");

    // Load level
    Resources.level.addTiledMapToScene(this);

    const gameLayer = Resources.level.data.getObjectLayerByName("Game");
    const playerObject = gameLayer.getObjectByType("Player")!;
    const player = new Bot(playerObject.x, playerObject.y);
    this.add(player);

    const baddieLayer = Resources.level.data.getObjectLayerByName("Baddies");
    const baddieObjects = baddieLayer.getObjectsByType("Baddie");

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

    // Create camera strategy
    this.camera.clearAllStrategies();
    this.camera.strategy.elasticToActor(player, 0.05, 0.1);
  }
}
