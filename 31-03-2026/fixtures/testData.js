const base = require('@playwright/test');

exports.test = base.test.extend({
    testData1 : {name : "test1", data: "data1"},
    testData2 : {name: "test2", data: "data2"}
});