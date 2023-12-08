import * as ex from 'excalibur';
import { loader } from './resources';
import { Level2 } from './scenes/level2';
import { GameOver } from './scenes/gameover';
import { stats } from './stats';
import { PlayerSelect } from './scenes/player-select';
import { Level1 } from './scenes/level1';

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

const playerSelect = new PlayerSelect();
engine.add('playerSelect', playerSelect);

const gameover = new GameOver();
engine.add('gameover', gameover);

const level1 = new Level1();
engine.add('level1', level1);

const level2 = new Level2();
engine.add('level2', level2);

const levels = [
    'playerSelect',
    'level1',
    'level2',
    'gameover'
];
let currentLevel = 0
engine.goToScene(levels[currentLevel]);
//engine.showDebug(true);
// Game events to handle
engine.on('hidden', () => {
    console.log('pause');
    engine.stop();
});
engine.on('preupdate', () => {
    if(stats.nextScene) {
        currentLevel += 1;
        stats.nextScene = false;
        engine.goToScene(levels[currentLevel]);
    } else if(stats.gameOver) {
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
(window as any).level = level1;