// константы для валидации хэштегов
const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

// выбор элементов DOM для работы с формой
const formUpload = document.querySelector('.img-upload__form');
const submitBtn = document.querySelector('#upload-submit');
const inputHashtag = document.querySelector('.text__hashtags');

// создание экземпляра Pristine для валидации формы
const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__error'
}, true);

// переменная для хранения текста ошибки
let errorMessage = '';

// функция, возвращающая текст ошибки
const error = () => errorMessage;

// обработчик ввода хэштега
const hashtagHandler = (value) => {
  errorMessage = '';

  // приведение введенного текста к нижнему регистру и удаление лишних пробелов
  const inputText = value.toLowerCase().trim();

  // в случае отсутствия текста, возвращаем true (всегда валидно)
  if (!inputText) {
    return true;
  }

  // разбиваем введенный текст на массив хэштегов по пробелам
  const inputArray = inputText.split(/\s+/);

  // в случае отсутствия элементов в массиве, возвращаем true (всегда валидно)
  if (inputArray.length === 0) {
    return true;
  }

  // правила валидации для хэштегов
  const rules = [
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэш-теги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэш-тег должен начинаться с #',
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэш-теги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хэш-тега ${MAX_SYMBOLS} символов, включая решётку`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэш-тег содержит недопустимые символы',
    },
  ];

  // проверка соответствия введенных данных правилам валидации
  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

// обработчик ввода для отслеживания изменений и активации/деактивации кнопки отправки формы
const onHashtagInput = () => {
  submitBtn.disabled = pristine.input(inputHashtag);
};

// добавление валидатора для хэштегов с использованием Pristine
pristine.addValidator(inputHashtag, hashtagHandler, error, 2, false);

// добавление обработчика события ввода для отслеживания изменений в поле хэштегов
inputHashtag.addEventListener('input', onHashtagInput);

// добавление обработчика события отправки формы
formUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();
  onHashtagInput(evt);
  pristine.validate();
});
