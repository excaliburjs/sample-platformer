import * as ex from 'excalibur';
import { iCharacter } from './icharacter';

const botFile = require('../res/excalibot.png');
const girlIdleFile = require('../res/girl-idle.png')
const girlRunFile = require('../res/girl-run.png')
const girlHurtFile = require('../res/girl-hurt.png')
const girlJumpFile = require('../res/girl-jump.png')
const boyIdleFile = require('../res/boy-idle.png')
const boyRunFile = require('../res/boy-run.png')
const boyHurtFile = require('../res/boy-hurt.png')
const boyJumpFile = require('../res/boy-jump.png')
const botRedFile = require('../res/excalibot-red.png');
const baddieFile = require('../res/baddie.png');
const gateClosedFile = require('../res/Door_Closed_Dark_Top_Round.png');
const gateOpenFile = require('../res/Door_Open_Dark_Top_Round.png');
const grassFlatFile = require('../res/Grass_Tile_Flat.png');
const grassBelowFile = require('../res/Grass_Tile_lower.png');
const potionPurpleFile = require('../res/Potion_Sm_Purple.png');
const blockFile = require('../res/block.png');
const npcFile = require('../res/npc.png');
const jumpSound = require('../res/jump.wav');
const hitSound = require('../res/hurt.wav');
const gotEmSound = require('../res/gottem.wav');

const Resources = {
    bot: new ex.ImageSource(botFile),
    botRed: new ex.ImageSource(botRedFile),
    girlIdle: new ex.ImageSource(girlIdleFile),
    girlRun: new ex.ImageSource(girlRunFile),
    girlHurt: new ex.ImageSource(girlHurtFile),
    girlJump: new ex.ImageSource(girlJumpFile),
    boyIdle: new ex.ImageSource(boyIdleFile),
    boyRun: new ex.ImageSource(boyRunFile),
    boyHurt: new ex.ImageSource(boyHurtFile),
    boyJump: new ex.ImageSource(boyJumpFile),
    baddie: new ex.ImageSource(baddieFile),
    gateOpen: new ex.ImageSource(gateOpenFile),
    gateClosed: new ex.ImageSource(gateClosedFile),
    grassFlat: new ex.ImageSource(grassFlatFile),
    grassBelow: new ex.ImageSource(grassBelowFile),
    potionPurple: new ex.ImageSource(potionPurpleFile),
    block: new ex.ImageSource(blockFile),
    npc: new ex.ImageSource(npcFile),
    jump: new ex.Sound(jumpSound),
    hit: new ex.Sound(hitSound),
    gotEm: new ex.Sound(gotEmSound)
}

const loader = new ex.Loader();

const tileSize: number = 208 / 4;

const girl: iCharacter = {
    name: "girl",
    idle: ex.SpriteSheet.fromImageSource({
        image: Resources.girlIdle,
        grid: {
            columns: 10,
            rows: 1,
            spriteWidth: 641,
            spriteHeight: 542
        }
    }),
    run: ex.SpriteSheet.fromImageSource({
        image: Resources.girlRun,
        grid: {
            columns: 8,
            rows: 1,
            spriteWidth: 641,
            spriteHeight: 542
        }
    }),
    hurt: ex.SpriteSheet.fromImageSource({
        image: Resources.girlHurt,
        grid: {
            columns: 1,
            rows: 1,
            spriteWidth: 641,
            spriteHeight: 542
        }
    }),
    jump: ex.SpriteSheet.fromImageSource({
        image: Resources.girlJump,
        grid: {
            columns: 10,
            rows: 1,
            spriteWidth: 641,
            spriteHeight: 542
        }
    }),
};
const boy: iCharacter = {
    name: "boy",
    idle: ex.SpriteSheet.fromImageSource({
        image: Resources.boyIdle,
        grid: {
            columns: 10,
            rows: 1,
            spriteWidth: 319,
            spriteHeight: 486
        }
    }),
    run: ex.SpriteSheet.fromImageSource({
        image: Resources.boyRun,
        grid: {
            columns: 8,
            rows: 1,
            spriteWidth: 415,
            spriteHeight: 507
        }
    }),
    hurt: ex.SpriteSheet.fromImageSource({
        image: Resources.boyHurt,
        grid: {
            columns: 1,
            rows: 1,
            spriteWidth: 588,
            spriteHeight: 600
        }
    }),
    jump: ex.SpriteSheet.fromImageSource({
        image: Resources.boyJump,
        grid: {
            columns: 10,
            rows: 1,
            spriteWidth: 407,
            spriteHeight: 536
        }
    }),
};
const botSpriteSheet = ex.SpriteSheet.fromImageSource({
    image: Resources.bot,
    grid: {
        columns: 8,
        rows: 1,
        spriteWidth: 32,
        spriteHeight: 32
    }
});
const botRedSpriteSheet = ex.SpriteSheet.fromImageSource({
    image: Resources.botRed,
    grid: {
        columns: 8,
        rows: 1,
        spriteWidth: 32,
        spriteHeight: 32
    }
});
const baddieSpriteSheet = ex.SpriteSheet.fromImageSource({
    image: Resources.baddie,
    grid: {
        columns: 6,
        rows: 1,
        spriteWidth: 32,
        spriteHeight: 32
    }
});
const gateClosedSpriteSheet = ex.SpriteSheet.fromImageSource({
    image: Resources.gateClosed,
    grid: {
        columns: 1,
        rows: 1,
        spriteWidth: 228,
        spriteHeight: 227
    }
});
const gateOpenSpriteSheet = ex.SpriteSheet.fromImageSource({
    image: Resources.gateOpen,
    grid: {
        columns: 1,
        rows: 1,
        spriteWidth: 228,
        spriteHeight: 227
    }
});
const potionPurpleSprite = Resources.potionPurple.toSprite();
const blockSprite = Resources.block.toSprite();
const grassFlatSprite = Resources.grassFlat.toSprite();
const grassBelowSprite = Resources.grassBelow.toSprite();
const npcSprite = Resources.npc.toSprite();

for (const res in Resources) {
    loader.addResource((Resources as any)[res]);
}

export {
    Resources, loader, tileSize,
    girl,
    boy,
    botSpriteSheet, botRedSpriteSheet,
    baddieSpriteSheet,
    gateOpenSpriteSheet, gateClosedSpriteSheet,
    potionPurpleSprite,
    blockSprite,
    grassFlatSprite, grassBelowSprite,
    npcSprite
}