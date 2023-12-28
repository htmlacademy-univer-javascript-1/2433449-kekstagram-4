import { debounce, shuffle } from './utils.js';
import { renderPhotos, removePhotos } from './pictures.js';
import { pictures } from './upload-data.js';

const MAX_RANDOM_FILTER_LENGTH = 10;

const filterForm = document.querySelector('.img-filters__form');

const showFilters = () => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const sortByCommentsCount = (firstItem, secondItem) => secondItem.comments.length - firstItem.comments.length;

const filters = {
  'filter-default': () => pictures.slice(),
  'filter-random': () => shuffle(pictures.slice()).slice(0, MAX_RANDOM_FILTER_LENGTH),
  'filter-discussed': () => pictures.slice().sort(sortByCommentsCount),
};

const onFilterClick = debounce((evt) => {
  if(evt.target.tagName === 'BUTTON') {
    const clickedButton = filterForm.querySelector('.img-filters__button--active');

    if(clickedButton) {
      clickedButton.classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');

    removePhotos();
    renderPhotos(filters[evt.target.id]());
  }
});

filterForm.addEventListener('click', onFilterClick);

export{showFilters};
