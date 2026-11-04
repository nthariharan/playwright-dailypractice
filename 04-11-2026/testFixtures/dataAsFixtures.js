import base from '@playwright/test';

const customTest = base.test.extend({
    customTestData : {
        customData1 : "TestData1"
    }
});

export default customTest;