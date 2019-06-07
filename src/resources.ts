import * as ex from '../Excalibur/build/dist/excalibur.js';

const botFile = require('../res/excalibot.png');
const botRedFile = require('../res/excalibot-red.png');
const baddieFile = require('../res/baddie.png');
const blockFile = require('../res/block.png');
const npcFile = require('../res/npc.png');

const Resources: {[key: string]: ex.Texture } = {
    bot: new ex.Texture(botFile),
    botRed: new ex.Texture(botRedFile),
    baddie: new ex.Texture(baddieFile),
    block: new ex.Texture(blockFile),
    npc: new ex.Texture(npcFile)
}

const loader = new ex.Loader();

const botSpriteSheet = new ex.SpriteSheet(Resources.bot, 8, 1, 32, 32);
const botRedSpriteSheet = new ex.SpriteSheet(Resources.botRed, 8, 1, 32, 32);
const baddieSpriteSheet = new ex.SpriteSheet(Resources.baddie, 6, 1, 32, 32);
const blockSprite = Resources.block.asSprite();
const npcSprite = Resources.npc.asSprite();

for (const res in Resources) {
    loader.addResource(Resources[res]);
}

export { Resources, loader, botSpriteSheet, botRedSpriteSheet, baddieSpriteSheet, blockSprite, npcSprite }