import * as ex from "excalibur";
import { ActionsComponent } from "excalibur";

export interface PatrolComponentArgs {
  speed: number;
  delay: number;
  from: ex.Vector;
  to: ex.Vector;
}

export class PatrolComponent extends ex.Component<"patrol"> {
  public readonly type = "patrol";

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

export class PatrolSystem extends ex.System<
  PatrolComponent | ex.ActionsComponent
> {
  public readonly types = ["patrol"] as const;
  public readonly systemType = ex.SystemType.Update;

  public update(entities: ex.Entity[], delta: number) {
    for (const entity of entities) {
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
