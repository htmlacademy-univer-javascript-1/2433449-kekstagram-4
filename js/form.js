
import { isEscKey } from './utils.js';

const body = document.querySelector('body');
const formUpload = document.querySelector('.img-upload__form');
const fileUpload = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');

// элементы для изменения изображений
const effects = document.querySelectorAll('.effects__preview');
const mainPicture = document.querySelector('.img-upload__preview img');

// функция для закрытия формы
const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  closeButton.removeEventListener('click', onCloseFormClick);
  document.removeEventListener('keydown', onCloseFormEscDown);

  // сброс данных формы
  formUpload.reset();
};

// обработчик клика по кнопке закрытия формы
function onCloseFormClick(evt) {
  evt.preventDefault();
  closeForm();
}

// обработчик нажатия клавиши Escape при открытой форме
function onCloseFormEscDown(evt) {
  if (isEscKey(evt) &&
    !evt.target.classList.contains('text__hashtag') &&
    !evt.target.classList.contains('text__description')) {
    evt.preventDefault();
    closeForm();
  }
}

// функция для изменения изображений при загрузке файла
const changeImages = () => {
  const file = fileUpload.files[0];
  const fileUrl = URL.createObjectURL(file);

  // установка нового изображения для основного превью и эффектов
  mainPicture.src = fileUrl;

  effects.forEach((effect) => {
    effect.style.backgroundImage = `url('${fileUrl}')`;
  });
};

// обработчик изменения файла в поле загрузки
const onFileUploadChange = () => {
  // Отображение оверлея и блокировка прокрутки страницы
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  // изменение изображений
  changeImages();

  // добавление обработчиков событий для закрытия формы
  closeButton.addEventListener('click', onCloseFormClick);
  document.addEventListener('keydown', onCloseFormEscDown);
};

// добавление обработчика события изменения файла
fileUpload.addEventListener('change', onFileUploadChange);
