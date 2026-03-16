const base = require('@playwright/test');

exports.customTest = base.test.extend({
    testData1:     {
            name: "Name 1",
            Title: "Designation 1"
        },
      testData2:    {
            name: "Name 2",
            Title: "Designation 2"
        }
    
});