// 랜덤한 기능 간단하게 하나 추가해봐
// PM → Dev. 2026-10-19T00:49:32.243Z

// Usage: const { pickRandom } = require('./random-picker'); console.log(pickRandom([1, 2, 3]));
'use strict';

function pickRandom(items) {
  if (!Array.isArray(items)) {
    throw new TypeError('pickRandom expects an array of numbers.');
  }

  if (items.length === 0) {
    throw new Error('pickRandom cannot select an item from an empty array.');
  }

  if (!items.every(function (item) { return typeof item === 'number'; })) {
    throw new TypeError('pickRandom expects an array containing only numbers.');
  }

  return items[Math.floor(Math.random() * items.length)];
}

module.exports = { pickRandom: pickRandom };

if (require.main === module) {
  var sampleItems = [10, 20, 30, 40, 50];
  console.log(pickRandom(sampleItems));
}
