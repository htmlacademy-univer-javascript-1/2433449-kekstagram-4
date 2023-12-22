import { uploadHashtagInput, clearHashtagsField, checkFormValidation, form } from './hashtags.js';
import { isEscape } from './utils.js';
import { scalingPhotos, uploadingOverlay } from './scalingPhoto.js';
import { setEffects } from './effects.js';
import { setData } from './fetch.js';
import { addPostMessages, showSuccessMessage, closeMessage, showErrorMessage } from './messages.js';
import { uploadUserPicture} from './user-picture.js';

const uploadingControl = form.querySelector('#upload-file');
const uploadingClose = form.querySelector('#upload-cancel');

const uploadingComments = uploadingOverlay.querySelector('.text__description');
const uploadingButton = uploadingOverlay.querySelector('#upload-submit');
const clearForm = () => {
  uploadingOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  uploadingControl.value = '';

  clearHashtagsField();
  uploadingComments.value = '';

  closeMessage();

  uploadingButton.disabled = false;
};

const onEscapeKeyDown = (evt) => {
  if(isEscape(evt) && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    clearForm();
    document.removeEventListener('keydown', onEscapeKeyDown);
  }
};

const closeForm = () => {
  clearForm();

  document.removeEventListener('keydown', onEscapeKeyDown);
};

uploadingClose.addEventListener('click', closeForm);

const onUploadClick = () => {
  document.addEventListener('keydown', onEscapeKeyDown);

  uploadUserPicture(uploadingControl.files[0]);

  uploadingOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  scalingPhotos();
  setEffects();
  uploadHashtagInput();
};

const uploadForm = () => {
  uploadingControl.addEventListener('change', onUploadClick);
  addPostMessages();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if(checkFormValidation()) {
    setData(showSuccessMessage, showErrorMessage, 'POST', new FormData(form));
  }
};

form.addEventListener('submit', onFormSubmit);

export{uploadForm, closeForm, onEscapeKeyDown};
