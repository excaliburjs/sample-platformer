import * as ex from 'excalibur';
import { loader } from './resources';
import { Level2 } from './scenes/level2';
import { GameOver } from './scenes/gameover';
import { stats } from './stats';
import { PlayerSelect } from './scenes/player-select';
import { Level1 } from './scenes/level1';
import { BeforeLevel1, BeforeLevel2 } from './scenes/beforeScenes';
import { iSceneNode } from './storyScene';

const engine = new ex.Engine({
    backgroundColor: ex.Color.fromHex('#5fcde4'),
    width: 600,
    height: 400,
    fixedUpdateFps: 60,
    // Turn off anti-aliasing for pixel art graphics
    antialiasing: false
});

// Create collision groups for the game
ex.CollisionGroupManager.create("player");
ex.CollisionGroupManager.create("enemy");
ex.CollisionGroupManager.create("floor");

// Set global gravity, 800 pixels/sec^2
ex.Physics.acc = new ex.Vector(0, 800);

let nodes: { [name: string]: iSceneNode & ex.Scene; } = {}

function addNode(node: iSceneNode & ex.Scene) {
    console.log("Adding scene ", node.thisScene, " -> ", node.nextScene);
    engine.add(node.thisScene, node)
    nodes[node.thisScene] = node;
}

const playerSelect = new PlayerSelect();
addNode(playerSelect);

addNode(new BeforeLevel1());
addNode(new Level1());
addNode(new BeforeLevel2());
addNode(new Level2());
addNode(new GameOver());

let currentNode: iSceneNode & ex.Scene = playerSelect;
engine.goToScene(currentNode.thisScene);
//engine.showDebug(true);

// Game events to handle
engine.on('hidden', () => {
    console.log('pause');
    engine.stop();
});
engine.on('preupdate', () => {
    if (stats.nextScene) {
        console.log("switching from ", currentNode.thisScene);
        currentNode = nodes[currentNode.nextScene];
        stats.nextScene = false;
        console.log("switching to ", currentNode.thisScene);
        engine.goToScene(currentNode.thisScene);
    } else if (stats.gameOver) {
        currentNode = nodes["gameover"];
        engine.goToScene('gameover');
    }
})
engine.on('visible', () => {
    console.log('start');
    engine.start();
});

// Start the engine
engine.start(loader).then(() => {
    console.log('game start');
});

// For test hook
(window as any).engine = engine;
(window as any).level = playerSelect;