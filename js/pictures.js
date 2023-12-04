const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const renderPhoto = (photo) => {
  const {url, description, comments, likes} = photo;
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture_img').src = url;
  pictureElement.querySelector('.picture_img').alt = description;
  pictureElement.querySelector('.picture_likes').textContent = likes;
  pictureElement.querySelector('.picture_comments').textContent = comments.length;

  return pictureElement;
};

const renderPhotos = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo));
  });

  pictures.appendChild(fragment);
};
export { renderPhotos };
