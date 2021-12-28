const { expectLoaded, expectPage, test } = require('@excaliburjs/testing');

test('A sample platformer', async (page) => {
    await page.evaluate(() => {
        window.__TESTING = true;
    });
    await expectLoaded();
    await page.waitForTimeout(500);

    await expectPage('Platfomer', './test/integration/images/actual-platformer.png').toBe('./test/integration/images/expected-platformer.png');
});