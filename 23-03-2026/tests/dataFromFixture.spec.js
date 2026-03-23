const {test} = require('../fixtures/dataFixture');


test.describe("Data fetched from Custom Fixture", async()=>{
    test("Fixture driven test data @DATA", async({testData1 , testData2})=>{
        console.log("testData1 =>", testData1);
        console.log("testData2 =>", testData2);
    });
});