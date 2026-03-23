const base = require('@playwright/test');

exports.test = base.test.extend({
    testData1 : {name : 'Test1', title :'senior tech'},
    testData2 : {name : 'Test2', title : 'manager'}
});