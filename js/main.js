import {uploadForm} from './form.js';
import {setData} from './fetch.js';
import {onRecieveSuccess, showUnloadingErrorMessage} from './uploadData.js';

setData(onRecieveSuccess,
  () => {
    showUnloadingErrorMessage('Не удалось загрузить данные из сервера :(');
  },
  'GET');

uploadForm();
