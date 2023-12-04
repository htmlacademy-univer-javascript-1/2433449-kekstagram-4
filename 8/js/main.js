import { getObjects } from './createObjects.js';
import { renderThumbnails } from './renderThumbnails.js';
import { renderBigPicture } from './renderBigPicture.js';

const objects = getObjects();
renderThumbnails(objects);
renderBigPicture(objects);
