import * as ex from 'excalibur';
import { LevelLayout } from '../levelLayout';
import { Floor, Wall } from '../floor';
import { Gate } from '../gate';

export class Level1 extends LevelLayout {

    layoutLevel(engine: ex.Engine) {
        this.playerStartsAt(2, 2);
        engine.add(new Wall({x:0, y:0, height:6}));
        engine.add(new Wall({x:11, y:0, height:6}));
        engine.add(new Floor({x:1, y:5, width:2}));
        // VOEG HIER EEN REGEL TOE VOOR EEN EXTRA VLOER
        engine.add(new Floor({x:9, y:5, width:2}));
        engine.add(new Gate(9, 5, 0));
    }
}