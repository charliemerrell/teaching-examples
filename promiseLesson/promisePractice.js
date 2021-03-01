// write a function that says "woo, let's go Multiverse!"
// but waits 1, 2 and 3 seconds between each word

function printCelebration() {
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
}



function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}

async function promisePrintCelebration() {
    console.log("Otters");
    await wait(1000);
    console.log("or")
    await wait(2000)
    console.log("Red");
    await wait(3000);
    console.log("Pandas?")
}

printCelebration()