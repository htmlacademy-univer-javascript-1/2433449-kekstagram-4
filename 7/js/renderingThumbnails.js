
const thumbnailConstructor = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

// функция для создания миниатюры изображения на основе предоставленных данных
const getThumbnail = (item) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = item.url;
  thumbnail.querySelector('.picture__img').alt = item.url;
  thumbnail.querySelector('.picture__comments').textContent = item.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = item.likes;
  thumbnail.dataset.id = item.id;
  return thumbnail;
};

// функция для отрисовки миниатюр
const renderingThumbnails = (items) => {
  const documentFragment = document.createDocumentFragment();
  items.forEach((item) => {
    documentFragment.append(getThumbnail(item));
  });
  thumbnailConstructor.appendChild(documentFragment);
};

export { renderingThumbnails };
