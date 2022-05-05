import * as ex from "excalibur";
import { Baddie } from "./baddie";
import { Player } from "./player";
import { NPC } from "./npc";
import { Resources } from "./resources";
import { Config } from "./config";
import { addPatrolToScene } from "./behaviors/patrol";

export class Level extends ex.Scene {
  constructor() {
    super();

    addPatrolToScene(this);
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
    const player = new Player(playerObject.x, playerObject.y);
    this.add(player);

    const npcObjects = gameLayer.getObjectsByType("NPC");

    for (const npcObject of npcObjects) {
      const npc = new NPC(
        npcObject.x,
        npcObject.y,
        npcObject.getProperty<number>("patrol_left")?.value ?? 0,
        npcObject.getProperty<number>("patrol_right")?.value ?? 0
      );
      this.add(npc);
    }

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
    this.camera.strategy.elasticToActor(
      player,
      Config.cameraElasticity,
      Config.cameraFriction
    );
  }
}
