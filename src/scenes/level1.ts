import * as ex from 'excalibur';
import { LevelLayout } from '../levelLayout';
import { Floor, Wall } from '../floor';
import { Gate } from '../gate';

export class Level1 extends LevelLayout {

    layoutLevel(engine: ex.Engine) {
        this.playerStartsAt(2, 2);
        engine.add(new Wall(0, 0, 6));
        engine.add(new Wall(11, 0, 6));
        engine.add(new Floor(1, 5, 2));
        // VOEG HIER EEN REGEL TOE VOOR EEN EXTRA VLOER
        engine.add(new Floor(9, 5, 2));
        engine.add(new Gate(9, 5, 0));
    }
}