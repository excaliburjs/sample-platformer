import * as ex from 'excalibur';
import { loader } from './resources';
import { Level } from './level';

const engine = new ex.Engine({
    backgroundColor: ex.Color.fromHex('#5fcde4'),
    width: 600,
    height: 400
});

// Turn off anti-aliasing for pixel art graphics
engine.setAntialiasing(false);

// Set global gravity, 800 pixels/sec^2
ex.Physics.acc = new ex.Vector(0, 800);

// Setup first level as a custom scene
engine.add('level', new Level(engine));
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