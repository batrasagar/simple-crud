function CalcTags(str) {
  let str2 = str.match(/#(.*) /).pop();
  let arr = str2.split(" ");
  var countObj = arr.reduce(function(acc, curr) {
    if (typeof acc[curr] == "undefined") {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }
    return acc;
  }, {});

  return countObj;
}
