const { expectLoaded, expectPage, test } = require('@excaliburjs/testing');

test('A sample platformer', async (page) => {
    await page.evaluate(() => {
        window.__TESTING = true;
    });
    await expectLoaded();

    // Wait for game to initialize and render
    await new Promise(resolve => setTimeout(resolve, 1000));

    await expectPage('Platformer', './test/integration/images/actual-platformer.png').toBe('./test/integration/images/expected-platformer.png');
});