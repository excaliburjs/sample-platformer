import * as ex from 'excalibur';
import { LevelLayout } from '../levelLayout';
import { Floor } from '../floor';
import { Gate } from '../gate';

export class Level1 extends LevelLayout {

    layoutLevel(engine: ex.Engine) {
        this.playerStartsAt(3, 2);
        engine.add(new Floor(0, 0, 1, 6));
        engine.add(new Floor(20, 0, 1, 6));
        engine.add(new Floor(1, 5, 15, 1));
        engine.add(new Floor(15, 5, 5, 1));
        engine.add(new Gate(18, 5, 0));
    }
}