import * as ex from 'excalibur';

const botFile = require('../res/excalibot.png');
const botRedFile = require('../res/excalibot-red.png');
const baddieFile = require('../res/baddie.png');
const blockFile = require('../res/block.png');
const npcFile = require('../res/npc.png');
const jumpSound = require('../res/jump.wav');
const hitSound = require('../res/hurt.wav');
const gotEmSound = require('../res/gottem.wav');

const Resources = {
    bot: new ex.Texture(botFile),
    botRed: new ex.Texture(botRedFile),
    baddie: new ex.Texture(baddieFile),
    block: new ex.Texture(blockFile),
    npc: new ex.Texture(npcFile),
    jump: new ex.Sound(jumpSound),
    hit: new ex.Sound(hitSound),
    gotEm: new ex.Sound(gotEmSound)
}

const loader = new ex.Loader();

const botSpriteSheet = new ex.SpriteSheet(Resources.bot, 8, 1, 32, 32);
const botRedSpriteSheet = new ex.SpriteSheet(Resources.botRed, 8, 1, 32, 32);
const baddieSpriteSheet = new ex.SpriteSheet(Resources.baddie, 6, 1, 32, 32);
const blockSprite = Resources.block.asSprite();
const npcSprite = Resources.npc.asSprite();

for (const res in Resources) {
    loader.addResource((Resources as any)[res]);
}

export { Resources, loader, botSpriteSheet, botRedSpriteSheet, baddieSpriteSheet, blockSprite, npcSprite }