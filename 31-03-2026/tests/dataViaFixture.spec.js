const {test} =require('../fixtures/testData');

test("TestData Via Fixtures @FIX", async({testData1,testData2})=>{
    console.log("TestData1 =>", testData1);
    console.log("Testdata2 =>", testData2);
});