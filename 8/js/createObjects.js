import { NAMES, DESCRIPTIONS, MESSAGES } from './constants.js';
import { getInt, getElement } from './util.js';

const createMessages = () =>
  Array.from({ length: getInt(1, 2) }, () => getElement(MESSAGES)).join(' ');
const getId = () => {
  let previousId = 0;
  return () => {
    previousId++;
    return previousId;
  };
};

const getPicId = getId();
const getRandomId = () => {
  const ids = new Set();
  return () => {
    let id = getInt(1, 500);
    while (ids.has(id)) {
      id = getInt(1, 500);
    }
    ids.add(id);
    return id;
  };
};
const getCommentsId = getRandomId();

const createComment = () => ({
  id: getCommentsId(),
  avatar: `img/avatar-${getInt(1, 6)}.svg`,
  message: createMessages(),
  name: getElement(NAMES),
});
const createObject = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  likes: getInt(15, 200),
  description: getElement(DESCRIPTIONS),
  name: getElement(NAMES),
  comments: Array.from({ length: getInt(0, 30) }, createComment),
});

const getObjects = () => Array.from({ length: 25 }, () => createObject(getPicId()));
export { getObjects };
