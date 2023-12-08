import { iCharacter } from "./icharacter";
import { boy } from "./resources";

class Stats {
    public character: iCharacter = boy;
    public health: number = 100;
    public gameOver: boolean = false;
    public nextScene: boolean = false;
    public score: number = 0;
    public reset() {
        this.health = 100;
        this.gameOver = false;
        this.score = 0;
    }
}

const stats = new Stats()


export { stats }