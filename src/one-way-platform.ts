import { Actor, ColliderComponent, CollisionType, Color, Engine, Entity, Shape, vec } from "excalibur";

export class OneWayPlatform extends Actor {
    private _sensor!: Entity;
    constructor(x: number, y: number, width: number, height: number) {
        super({
            x,
            y,
            width,
            height,
            color: Color.Red,
            collisionType: CollisionType.Passive
        });
    }

    onInitialize(_engine: Engine): void {
        this._sensor = new Actor({
            y: -20,
            collider: Shape.Box(this.width, 10, vec(0.5, 1))
        });

        const collider = this._sensor.get(ColliderComponent)!;
        this.addChild(this._sensor);
        collider.events.on('collisionstart', () => {
            this.body.collisionType = CollisionType.Fixed;
        });
        collider.events.on('collisionend', () => {
            this.body.collisionType = CollisionType.Passive;
        });
    }
}