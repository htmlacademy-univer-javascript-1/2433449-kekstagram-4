const getRandomInteger = (a,b) => {
  const upper = Math.floor(Math.max(a,b));
  const lower = Math.ceil(Math.min(a,b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const formerValues = [];

  return function () {
    let actualValue = getRandomInteger(min, max);

    while (formerValues.includes(actualValue)) {
      actualValue = getRandomInteger(min, max);
    }

    formerValues.push(actualValue);

    return actualValue;
  };
};

const isEscKey = (evt) => evt.key === 'Escape';
const createImageUrl = (id, derictory, format) => derictory + id + format;
export {getRandomInteger, createRandomIdFromRangeGenerator, createImageUrl, isEscKey};
