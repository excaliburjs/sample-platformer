const { expectLoaded, expectPage, test } = require('@excaliburjs/testing');

test('A sample platformer', async (page) => {
    await expectLoaded();
    await page.evaluate(() => {
        window.engine.currentScene.camera.clearAllStrategies();
    });
    await page.waitForTimeout(500);
    await page.evaluate(() => {
        (window.engine).stop();
    });
    await expectPage('Platfomer', './test/integration/images/actual-platformer.png').toBe('./test/integration/images/expected-platformer.png');
});