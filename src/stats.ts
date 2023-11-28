class Stats {
    public health: number = 100;
    public gameOver: boolean = false;
    public score: number = 0;
    public reset() {
        this.health = 100;
        this.gameOver = false;
        this.score = 0;
    }
}

const stats = new Stats()


export { stats }