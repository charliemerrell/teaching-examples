const myPromise = Promise.resolve('blah'); // creates a pre-resolved promise object
console.log('Raccoons are')
myPromise.then(() => {
    console.log('cute')
});
console.log('also')