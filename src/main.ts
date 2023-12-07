import * as ex from 'excalibur';
import { loader } from './resources';
import { Level } from './scenes/level';
import { GameOver } from './scenes/gameover';
import { stats } from './stats';
import { PlayerSelect } from './scenes/player-select';

const engine = new ex.Engine({
    backgroundColor: ex.Color.fromHex('#5fcde4'),
    width: 600,
    height: 400,
    fixedUpdateFps: 60,
    // Turn off anti-aliasing for pixel art graphics
    antialiasing: false
});

// Set global gravity, 800 pixels/sec^2
ex.Physics.acc = new ex.Vector(0, 800);

const playerSelect = new PlayerSelect();
engine.add('playerSelect', playerSelect);

const gameover = new GameOver();
engine.add('gameover', gameover);

// Setup first level as a custom scene
const level = new Level();
engine.add('level', level);

const levels = [
    'playerSelect',
    'level',
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
(window as any).level = level;