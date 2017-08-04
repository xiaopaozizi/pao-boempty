/**
 * Created by 小炮子子 on 2017/8/3.
 */


let arrA = [1,2,3,4,5];
let arrB = [2,4,5,6,9];
console.log('A:'+ arrA);
console.log('B:'+ arrB);
// 相同的
let arrCommon = commonFilter(arrA, arrB);
console.log("相同的:" + arrCommon);
// arrA的不同地方
let diffA = diffFilter(arrA, arrCommon);
console.log("A不同的:" + diffA);

// arrB的不同地方
let diffB = diffFilter(arrB, arrCommon);
console.log("B不同的:" + diffB);
// 相同
function commonFilter(arr1, arr2){
    let res = [];
    arr1.forEach(item => {
        if(arr2.indexOf(item) > -1){
            res.push(item);
        }
    })
    return res;
}
// 不同
function diffFilter(arr1, arr2){
    let res = [];
    arr1.forEach(item => {
        if(arr2.indexOf(item) === -1){
            res.push(item);
        }
    })
    return res;
}

