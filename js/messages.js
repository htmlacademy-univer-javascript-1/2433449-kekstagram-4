import { closeForm, onEscapeKeyDown } from './formUpload.js';
import { isEscape } from './utils.js';

const MESSAGE_Z_POSITION = 100;

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successTemplate.cloneNode(true);
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorTemplate.cloneNode(true);

const checkElementTarget = (evt, button, inner) => evt.target.classList.contains(button) || !evt.target.classList.contains(inner);

const closeMessage = (message = successMessage) => {
  message.classList.add('hidden');
};

const onSuccessClick = (evt) => {
  if (checkElementTarget(evt, 'success__button', 'success__inner')) {
    closeForm();
  }
};

const closeErrorMessage = () => {
  closeMessage(errorMessage);
  document.addEventListener('keydown', onEscapeKeyDown);
};

const onErrorEscapeDown = (evt) => {
  if(isEscape(evt)) {
    document.removeEventListener('keydown', onErrorEscapeDown);
    closeErrorMessage();
  }
};

const onErrorClick = (evt) => {
  if(checkElementTarget(evt, 'error__button', 'error__inner')) {
    document.removeEventListener('keydown', onErrorEscapeDown);
    closeErrorMessage();
  }
};

const appendMessage = (message) => {
  message.classList.add('hidden');
  message.style.zIndex = MESSAGE_Z_POSITION;
  document.body.appendChild(message);
};

const showSuccessMessage = () => {
  successMessage.classList.remove('hidden');
  successMessage.addEventListener('click', onSuccessClick, {once: true});
};

const addPostMessages = () => {
  appendMessage(successMessage);
  appendMessage(errorMessage);
};

const showErrorMessage = () => {
  document.removeEventListener('keydown', onEscapeKeyDown);
  document.addEventListener('keydown', onErrorEscapeDown);
  errorMessage.classList.remove('hidden');
  errorMessage.addEventListener('click', onErrorClick, {once: true});
};
