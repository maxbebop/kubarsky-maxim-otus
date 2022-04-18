var fn1 = () => {
  console.log('fn1')
  return Promise.resolve(1);
}

var fn2 = () => new Promise(resolve => {
  console.log('fn2')
  setTimeout(() => resolve(2), 1500);
});

var fn3 = () => new Promise(resolve => {
  console.log('fn3')
  setTimeout(() => resolve(3), 1000);
});

function promiseReduce(asyncFunctions, reduce, initialValue) {

  return asyncFunctions.reduce((prevFuncPromise, currentFunc) => {
    return prevFuncPromise.then(currResult => {
      return currentFunc().then(prevResult => {
        return reduce(prevResult, currResult);
      });
    });
  }, Promise.resolve(initialValue));

}


promiseReduce([fn1, fn2, fn3], function (memo, value) {
  console.log(`reduce memo: ${memo};  value: ${value}`);
  return memo * value;
}, 1).then(console.log);

