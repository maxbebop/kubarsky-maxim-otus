var fn1 = () => {
    console.log('fn1')
    return Promise.resolve(1);
}

var fn2 = () => new Promise(resolve => {
    console.log('fn2')
    setTimeout(() => resolve(2), 1000);
});

var fn3 = () => new Promise(resolve => {
  console.log('fn3')
  setTimeout(() => resolve(3), 1000);
});


function promiseReduce(asyncFunctions, reduce, initialValue) {

  let index = 0;
 
  let promise = () => {
    if (asyncFunctions.length - 1> index){
        return asyncFunctions[index].call().then(result => {
                index++; 
                return new Promise(resolve => resolve(promise(reduce(initialValue, result)))); 
            });
    } else {
        return asyncFunctions[index].call().then(result => reduce(initialValue, result));
      } 
  };

  return promise.call();
}


promiseReduce([fn1, fn2, fn3], function (memo, value) {
        //console.log(`reduce memo: ${memo};   value: ${value}`);
        console.log('reduce');
        return memo * value;
    }, 1).then(console.log);
