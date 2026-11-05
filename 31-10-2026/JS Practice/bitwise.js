/* bitwiseAND(7, 12) ➞ 4

bitwiseOR(7, 12) ➞ 15

bitwiseXOR(7, 12) ➞ 11 */

/**
 * 
 * @param {Number} n1 
 * @param {Number} n2 
 */
function bitwiseAND(n1, n2) {
    let temp1 =n1.toString(2);
    let temp2 = n2.toString(2);
	console.log(temp1 & temp2);

    console.log (parseInt((temp1&temp2),2));
    // console.log((111&1100).toString(10));
    // console.log(parseInt('0100',2));
}



bitwiseAND(7, 12);