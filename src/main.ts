import{Engine, Color, vec}from 'excalibur';
import { loader } from './resources';
import { Level } from './level';

const engine = new Engine({
    backgroundColor: Color.fromHex('#5fcde4'),
    width: 600,
    height: 400,
    fixedUpdateFps: 60,
    // Turn off anti-aliasing for pixel art graphics
    antialiasing: false,
    physics: {
        // Set global gravity, 800 pixels/sec^2
        gravity: vec(0, 800)
    }
});

// Setup first level as a custom scene
const level = new Level();
engine.add('level', level);
engine.goToScene('level');

// Game events to handle
engine.on('hidden', () => {
    console.log('pause');
    engine.stop();
});
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