const request = require('request');

const time1 = Date.now();

let sum = 0;
for (let i = 1; i <= 1000000; i++) {
    sum += i;
}
const time2 = Date.now();


const total1 = (time2 - time1) / 1000;

console.log('it took us', total1, 'seconds to calculate the sum of the numbers from 1 to a million');



const time3 = Date.now();

request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
    const time4 = Date.now();

    const total2 = (time4 - time3) / 1000;
    console.log('it took us', total2, 'seconds to receive a network response');

});





