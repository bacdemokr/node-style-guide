// 랜덤한 기능 간단하게 하나 추가해봐
// PM → Dev. 2026-10-19T00:54:11.785Z

// Usage: const { getRandomNumber, pickRandom } = require('./random-utils');

function getRandomNumber(min, max) {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new TypeError('min and max must be integers');
  }

  if (min > max) {
    throw new RangeError('min must be less than or equal to max');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(items) {
  if (!Array.isArray(items)) {
    throw new TypeError('items must be an array');
  }

  if (items.length === 0) {
    throw new RangeError('cannot pick a random item from an empty array');
  }

  return items[getRandomNumber(0, items.length - 1)];
}

module.exports = {
  getRandomNumber,
  pickRandom
};

if (require.main === module) {
  const number = getRandomNumber(1, 10);
  const item = pickRandom(['apple', 'banana', 'cherry']);

  console.log('Random number:', number);
  console.log('Random item:', item);

  if (number < 1 || number > 10 || !['apple', 'banana', 'cherry'].includes(item)) {
    throw new Error('Self-test failed');
  }
}
