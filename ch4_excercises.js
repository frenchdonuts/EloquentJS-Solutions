//sum_of_a_range();
function sum_of_a_range() {
  function range(start, end, step) {
    if (start > end && step > 0) { console.log("Infinite array"); return []; }
    else if (start < end && step < 0) { console.log("Infinite array"); return []; }
    var result = [], 
        i = start;
    if (step == undefined) step = 1;

    while(pred(i, start, end, step)) {
      result.push(i);
      i += step;
    }
    function pred(index, start, end, step) {
      if (step < 0) return index >= end;
      else return index <= end;
    }
    
    return result;
  }
  function fold(fn, zero, arr) {
    var acc = zero;
    for (var i = 0; i < arr.length; i++) {
      acc = fn(acc, arr[i]);
    }
    return acc;
  }
  function sum(arr) {
    function add(x, y) { return x + y; }
    return fold(add, 0, arr);
  }
  console.log(sum(range(1, 10)));
  // -> 55
  console.log(range(5, 2, -1));
  // -> [5, 4, 3, 2]
}

//reverse_array();
function reverse_array() {
  function reverseArray_recur(arr) {
    if (arr.length > 0) {
      return reverseArray(arr.slice(1)).concat(arr.slice(0,1));
    } else return []
  }
  function reverseArray(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      result.push(arr[arr.length - 1 - i])
    }
    return result;
  }

  function reverseArrayInPlace(arr) {
    for (var i = 0; i < Math.floor(arr.length/2); i++) {
      var temp = arr[i];
      arr[i] = arr[(arr.length - 1) - i]
      arr[(arr.length - 1) - i] = temp;
    }
  }

  console.log(reverseArray(["A", "B", "C"]));
  // → ["C", "B", "A"];
  var arrayValue = [1, 2, 3, 4, 5];
  reverseArrayInPlace(arrayValue);
  console.log(arrayValue);
  // → [5, 4, 3, 2, 1]
}

//a_list();
function a_list() {
  function arrayToList(arr) {
    if (arr.length > 0)
      return {
        value: arr[0],
        rest: arrayToList(arr.slice(1))
      };
    else return null;
  }

  function listToArray(list) {
    if (list.rest === null)
      return [list.value];
    else return [list.value].concat(listToArray(list.rest));
  }

  function prepend(value, list) {
    return { value: value, rest: list };
  }

  function nth(list, index) {
    if (list === null) return undefined;
    if (index === 0) return list.value;
    return nth(list.rest, index - 1);
  }

  console.log(arrayToList([10, 20]));
  // → {value: 10, rest: {value: 20, rest: null}}
  console.log(listToArray(arrayToList([10, 20, 30])));
  // → [10, 20, 30]
  console.log(prepend(10, prepend(20, null)));
  // → {value: 10, rest: {value: 20, rest: null}}
  console.log(nth(arrayToList([10, 20, 30]), 1));
  // → 20
}

deep_comparison();
function deep_comparison() {
  function deepEqual(value1, value2) {
    if (value1 === null && value2 === null) return true;
    if (typeof value1 === 'object' && typeof value2 === 'object') {
      var result = true;
      for (var key in value1) {
        result = result && deepEqual(value1[key], value2[key]);
      }
      return result;
    }
    else
      return value1 === value2;
  }

  var obj = {here: {is: "an"}, object: 2};
  console.log(deepEqual(obj, obj));
  // → true
  console.log(deepEqual(obj, {here: 1, object: 2}));
  // → false
  console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
  // → true
}