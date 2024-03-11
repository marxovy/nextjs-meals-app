const testArr = [1, 2, 3, 4, 3, 2, 1];

const confirmTelescopic = (arr) => {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    if (arr[i] !== i + 1 || arr[--len] !== i + 1) {
      return false;
    }
    if (arr[i] !== arr[len]) {
      return false;
    }
  }
  return true;
};

console.log(confirmTelescopic(testArr));
