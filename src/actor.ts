import * as ex from 'excalibur';

export class Actor extends ex.Actor {
    kill(respawn?: number): void {
        if (respawn !== undefined) {
            const scene = this.scene;
            this.scene.engine.clock.schedule(() => {
                scene.add(this);
            }, respawn * 1000);
        }
        super.kill();
    }
}