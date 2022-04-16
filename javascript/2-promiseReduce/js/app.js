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

  return asyncFunctions.reduce((prevFuncPromise, currentFunc, index) => {
    return currentFunc().then(currResult => {
      if (index === 0) {
        return reduce(initialValue, currResult);
      }
      return prevFuncPromise.then(prevResult => {
        return reduce(prevResult, currResult);
      });
    });
  }, initialValue);

}

function promiseReduce2(asyncFunctions, reduce, initialValue) {

  return asyncFunctions.reduce((prevFuncPromise, currentFunc) => {
    return currentFunc().then(currResult => {
      return prevFuncPromise.then(prevResult => {
        return reduce(prevResult, currResult);
      });
    });
  }, Promise.resolve(initialValue));

}
console.log('----- v1 -------');

promiseReduce([fn1, fn2, fn3], function (memo, value) {
  console.log(`reduce memo: ${memo};  value: ${value}`);
  return memo * value;
}, 1).then(console.log).then(() => {

  console.log('----- v2 --------');
  promiseReduce2([fn1, fn2, fn3], function (memo, value) {
    console.log(`reduce memo: ${memo};  value: ${value}`);
    return memo * value;
  }, 1).then(console.log);

});

