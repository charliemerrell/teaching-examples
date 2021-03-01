Have a look at the code below:

```
console.log("Otters")
    setTimeout(() => {
        console.log("or")
        setTimeout(() => {
            console.log("Red")
            setTimeout(() => {
                console.log("Pandas?")
            }, 3000)
        }, 2000)
    }, 1000)
```

What do you think of it? Is it easy to understand exactly what it's doing?

What about this:

```
    console.log("Otters");
    await wait(1000);
    console.log("or")
    await wait(2000)
    console.log("Red");
    await wait(3000);
    console.log("Pandas?")
```

You might not yet know what the `await` keyword does but I think you'll agree that this second version is easier to follow. Unlike the previous example, the code reads as a top-to-bottom list of instructions, rather than a tangled mess of nested callbacks.

The 2nd example has been simplified by using **promises**.

A promise is an **object** which represents an asynchronous task. A promise begins in the `pending` state and, once the asynchronous task is finished, transitions to either `fulfilled` or `rejected`. In the example above, the `wait` function is returning a promise (we'll look at how to create promises later as this is less important).

A place you might've seen promises is in the `fetch` api. The call to `fetch(url)` in some javascript running in a browser will make a GET request to given url. Network requests take a long time however so the `fetch` function returns a promise which represents the request.

```
const fetchRequest = fetch('https://api.opendota.com/api/players/76561198061622614/rankings');

console.log(fetchRequest);

await fetchRequest;

console.log(fetchRequest);

console.log(await fetchRequest);
```

this logs out 

```
>> Promise {<pending>}
>> Promise {<fulfilled>}
>> Response {...}
```

Notice the `await` keyword is doing 2 things:
- it pauses the code until the promise has finished `pending`
- it gives us the unwrapped value of the promise

The `await` keyword can only be used inside `async` functions:

```
async function makeRequest() {
    const response = await fetch(url);
}
```

`async` functions also always return a promise. Take the code below:

```
async function double(x) {
    return 2 * x
}

console.log(double(10))
```

Even though there is no asynchronous logic, so we aren't having to wait for anything, the output is still a promise:

```
>> Promise { 20 }
```

An alternative to `async/await` is to use the promise's `then` method:

```
fetch(`https://api.opendota.com/api/players/76561198061622614/rankings`)
    .then(response => {
        // `reponse` here is the unwrapped value of the promise (i.e. the network response)
    })
```

`then` can be used in a normal function but pay attention to the order of execution:

```
const myPromise = Promise.resolve('blah'); // creates a pre-resolved promise object
console.log('Raccoons are')
myPromise.then(() => {
    console.log('cute')
});
console.log('also')
```

```
>> Raccoons are
>> also
>> cute
```

Note that the 'also' was printed before the 'cute' even though `myPromise` was already resolved.

So how do you create a promise? It's done via the `Promise` constructor and follows this pattern: 

```
const myPromise = new Promise((resolve, reject) => {
    // some asynchronous logic 
    if (asyncWasSuccessful) {
        resolve(valueFromAsyncLogic)
    }
    else {
        reject(errFromAsyncLogic)
    }
});
```

As you can see, it's a little complicated: the Promise constructor takes a function (called the executor) which takes two more functions (`resolve` and `reject`, here) to be called depending on whether the asynchronous logic (e.g. a network request, a disk operation etc.) was successful. Fortunately, the majority of the time you'll be consuming a promise you've been returned by an API so won't have to worry about creating them. 

A concrete example of how I made the `wait` function can be seen below:

```
function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}
```

