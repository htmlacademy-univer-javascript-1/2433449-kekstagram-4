
import { isEscKey } from './utils.js';

// выбор шаблона для комментария и других элементов DOM
const commentTemplate = document.querySelector('#comments').content.querySelector('li');
const body = document.body;
const bigPictureForm = document.querySelector('.big-picture');
const bigPictureImage = bigPictureForm.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureForm.querySelector('.big-picture__social .likes-count');
const bigPictureDescription = bigPictureForm.querySelector('.big-picture__social .social__caption');
const bigPictureCommentsCount = bigPictureForm.querySelector('.social__comment-count');
const socials = document.querySelector('.social__comments');
const closeButton = document.querySelector('#picture-cancel');

// константа и переменные для управления отображением комментариев
const COMMENTS_STEP =  5;
const loader = document.querySelector('.comments-loader');
let currentComments = [];
let visiableCommentsCount;

// функция для отрисовки одного комментария
const renderComment = (comment) => {
  const currentComment = commentTemplate.cloneNode(true);

  currentComment.querySelector('.social__picture').src = comment.avatar;
  currentComment.querySelector('.social__picture').alt = comment.name;
  currentComment.querySelector('.social__text').textContent = comment.message;

  return currentComment;
};

// функция для отрисовки массива комментариев
const renderComments = (comments) => {
  const commentFragment = document.createDocumentFragment();

  comments.forEach((element) => {
    commentFragment.append(renderComment(element));
  });

  return commentFragment;
};

// функция для создания и отображения комментариев
const createComments = () => {
  // очистка текущих комментариев
  socials.innerHTML = '';
  // определение видимого количества комментариев
  visiableCommentsCount  = Math.min(visiableCommentsCount, currentComments.length);
  // выбор видимых комментариев
  const commentsSelected = currentComments.slice(0, visiableCommentsCount);

  // управление отображением загрузчика комментариев
  if (currentComments.length <= COMMENTS_STEP || visiableCommentsCount >= currentComments.length){
    loader.classList.add('hidden');
  } else {
    loader.classList.remove('hidden');
  }

  // обновление счетчика комментариев и отображение выбранных комментариев
  bigPictureCommentsCount.textContent = `${visiableCommentsCount} из ${currentComments.length} комментариев`;
  socials.append(renderComments(commentsSelected));
};

// обработчик события загрузки новых комментариев
const onLoadNewComments = (evt) => {
  evt.preventDefault();
  visiableCommentsCount += COMMENTS_STEP;
  createComments();
};

// функция для отображения большой картинки и комментариев
const renderBigPicture = (data) => {
  bigPictureImage.src = data.url;
  bigPictureLikes.textContent = data.likes;
  bigPictureDescription.textContent = data.description;
  bigPictureCommentsCount.textContent = data.comments.length;
};

// функция для закрытия большой картинки
const closeBigPicture = () => {
  bigPictureForm.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  loader.removeEventListener('click', onLoadNewComments);
};

// обработчик события нажатия клавиши на документе
function onDocumentKeyDown(evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

// функция для отображения картинки и комментариев
const displayImageAndComments = (data) => {
  renderBigPicture(data);
  createComments();
};

// функция для отображения большой картинки
const showBigPicture = (picture) => {
  // отображение формы с большой картинкой
  bigPictureForm.classList.remove('hidden');
  // добавление класса для блокировки прокрутки страницы
  body.classList.add('modal-open');

  // инициализация массива комментариев и счетчика видимых комментариев
  currentComments = picture.comments.slice();
  visiableCommentsCount = COMMENTS_STEP;

  // отображение картинки и комментариев
  displayImageAndComments(picture);

  // добавление обработчиков событий
  document.addEventListener('keydown', onDocumentKeyDown);
  closeButton.addEventListener('click', closeBigPicture);
  loader.addEventListener('click', onLoadNewComments);
};

export { showBigPicture };
