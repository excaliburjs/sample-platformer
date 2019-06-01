import * as ex from '../Excalibur/build/dist/excalibur.js';
import { loader } from './resources';
import { Game } from './game';

const engine = new ex.Engine({
    backgroundColor: ex.Color.fromHex('#5fcde4'),
    width: 600,
    height: 400
});

engine.setAntialiasing(false);


// engine.isDebug = true;
// ex.Physics.showMotionVectors = true;

// ex.Physics.useRigidBodyPhysics();
// ex.Physics.allowRigidBodyRotation = false;
ex.Physics.acc = new ex.Vector(0, 800);
ex.Physics.collisionPasses = 1;

engine.add('game', new Game(engine));
engine.goToScene('game');

// Game events to handle
engine.on('hidden', () => {
    console.log('pause');
    engine.stop();
});
engine.on('visible', () => {
    console.log('start');
    engine.start();
});

// engine.onPostUpdate = () => {
//     console.log('fps', engine.stats.currFrame.fps);
// }

engine.start(loader).then(() => {
    
});