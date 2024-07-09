import * as ex from "excalibur";
import { ActionsComponent } from "excalibur";

export interface PatrolComponentArgs {
  speed: number;
  delay: number;
  from: ex.Vector;
  to: ex.Vector;
}

export class PatrolComponent extends ex.Component {
  public speed = 50;
  public delay = 1000;
  public from = ex.Vector.Zero;
  public to = ex.Vector.Zero;

  private _isInitialized = false;
  private _actions: ActionsComponent | undefined;

  constructor(public patrolArgs?: PatrolComponentArgs) {
    super();

    if (patrolArgs) {
      this.speed = patrolArgs.speed;
      this.delay = patrolArgs.delay;
      this.from = patrolArgs.from;
      this.to = patrolArgs.to;
    }
  }

  public initialize(actions: ActionsComponent) {
    if (this._isInitialized) {
      return;
    }

    this._actions = actions;

    actions
      .delay(this.delay)
      .repeatForever((ctx) =>
        ctx
          .moveTo(this.from.x, this.from.y, this.speed)
          .delay(this.delay)
          .moveTo(this.to.x, this.to.y, this.speed)
          .delay(this.delay)
      );

    this._isInitialized = true;
  }

  public stop() {
    if (this._isInitialized) {
      this._actions?.clearActions();
    }
  }
}

export class PatrolSystem extends ex.System  {
  public readonly systemType = ex.SystemType.Update;
  query: ex.Query<typeof PatrolComponent>;
  constructor(world: ex.World) {
    super()
    this.query = world.query([PatrolComponent]);
  }

  public update(delta: number) {
    for (const entity of this.query.entities) {
      this.initializePatrol(entity, delta);
    }
  }

  private initializePatrol(entity: ex.Entity, delta: number) {
    const patrol = entity.get(PatrolComponent);
    const actions = entity.get(ActionsComponent);

    if (patrol && actions) {
      patrol.initialize(actions);
    }
  }
}
