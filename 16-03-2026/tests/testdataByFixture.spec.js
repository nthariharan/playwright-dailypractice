const {customTest} = require('../fixtures/testData');

customTest("Sample Fixtures With TestData @FIX1", async({testData1,testData2}) =>{
    console.log(testData1);
    console.log(testData2);
});
