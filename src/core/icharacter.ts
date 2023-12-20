import * as ex from 'excalibur';

export interface iCharacter {
    name: string;
    idle: ex.SpriteSheet;
    run: ex.SpriteSheet;
    hurt: ex.SpriteSheet;
    jump: ex.SpriteSheet;
};
