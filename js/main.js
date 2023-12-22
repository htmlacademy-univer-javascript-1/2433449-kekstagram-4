import {setData} from './fetch.js';
import {onRecieveSuccess, showUnloadingErrorMessage} from './upload-data.js';

setData(onRecieveSuccess,
  () => {
    showUnloadingErrorMessage('Не удалось загрузить данные из сервера :(');
  });
