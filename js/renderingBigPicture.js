
const bigPicture = document.querySelector('.big-picture');
const removeButton = bigPicture.querySelector('.big-picture__cancel');
const img = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const body = document.querySelector('body');
const socialCaption = bigPicture.querySelector('.social__caption');
const comment = document.querySelector('.social__comment');
const commentsList = document.querySelector('.social__comments');
const commentsCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

// функция для открытия модального окна большого изображения
const openPicture = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

// функция для закрытия модального окна большого изображения
const closePicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

// обработчик события для клавиши 'Esc' для закрытия модального окна
const escapeKeydown = (event) => {
  if (event.key === 'Escape') {
    closePicture();
    event.preventDefault();
  }
};

// функция для создания нового элемента комментария на основе предоставленных данных
const getComment = (item) => {
  const newComment = comment.cloneNode(true);
  newComment.querySelector('.social__picture').alt = item.name;
  newComment.querySelector('.social__picture').src = item.avatar;
  newComment.querySelector('.social__text').textContent = item.message;
  return newComment;
};

// функция для заполнения списка комментариев предоставленными данными
const getCommentsList = (items) => {
  commentsList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    fragment.append(getComment(item));
  });
  commentsList.append(fragment);
};

// функция для отображения деталей изображения в модальном окне большого изображения
const getPictureDetails = (item) => {
  img.src = item.url;
  likesCount.textContent = item.likes;
  commentsCount.textContent = item.comments.length;
  socialCaption.textContent = item.description;
  getCommentsList(item.comments);
};

// функция для обработки рендеринга модального окна большого изображения
const renderingBigPicture = (items) => {
  const picturesList = document.querySelectorAll('.picture');
  picturesList.forEach((item) => {
    // Добавление обработчика событий клика для открытия модального окна большого изображения
    item.addEventListener('click', () => {
      openPicture();
      getPictureDetails(items[item.dataset.id - 1]);
    });
  });

  // обработчик события для закрытия модального окна большого изображения при нажатии кнопки отмены
  removeButton.addEventListener('click', closePicture);

  // обработчик события для закрытия модального окна большого изображения при нажатии клавиши 'Esc'
  document.addEventListener('keydown', escapeKeydown);
};

export { renderingBigPicture };
