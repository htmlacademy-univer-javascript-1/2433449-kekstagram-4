const MAX_MARVIN_VALUE = 100;
const MAX_PHOBOS_VALUE = 3;
const MAX_HEAT_VALUE = 3;
const RELIX = 10;

const Slider = {
  MIN: 0,
  MAX: 100,
  STEP: 1,
  CONNECT: 'lower'
};

const uploadingOverlay = document.querySelector('.img-upload__overlay');
const uploadingPicture = uploadingOverlay.querySelector('.img-upload__preview').querySelector('img');
const sliderValue = uploadingOverlay.querySelector('.effect-level__value');
const sliderItem = uploadingOverlay.querySelector('.effect-level__slider');
const sliderField = uploadingOverlay.querySelector('.img-upload__effect-level');
const effectsList = uploadingOverlay.querySelector('.effects__list');

let currentEffect = '';

noUiSlider.create(sliderItem, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX
  },
  start: Slider.MAX,
  step: Slider.STEP,
  connect: Slider.CONNECT
});

const getEffectStep = (effectMaxValue) => effectMaxValue / Slider.MAX;

const effects = {
  none: () => {
    sliderField.classList.add('hidden');
    return 'none';
  },

  chrome: () => {
    sliderField.classList.remove('hidden');
    return `grayscale(${parseInt(sliderValue.value, RELIX) * getEffectStep(1)})`;
  },

  sepia: () => {
    sliderField.classList.remove('hidden');
    return `sepia(${parseInt(sliderValue.value, RELIX) * getEffectStep(1)})`;
  },

  marvin: () => {
    sliderField.classList.remove('hidden');
    return `invert(${parseInt(sliderValue.value, RELIX) * getEffectStep(MAX_MARVIN_VALUE)}%)`;
  },

  phobos: () => {
    sliderField.classList.remove('hidden');
    return `blur(${parseInt(sliderValue.value, RELIX) * getEffectStep(MAX_PHOBOS_VALUE)}px)`;
  },

  heat: () => {
    sliderField.classList.remove('hidden');
    const effectMin = Slider.MAX / (MAX_HEAT_VALUE - 1);
    return `brightness(${(effectMin + parseInt(sliderValue.value, RELIX)) * getEffectStep(MAX_HEAT_VALUE - 1)})`;
  }
};

const onSliderChange = () => {
  sliderValue.value = sliderItem.noUiSlider.get();

  uploadingPicture.style.filter = effects[currentEffect.replace('effects__preview--', '')]();
};

const onEffectsClick = (evt) => {
  let element = evt.target;

  if(element.classList.contains('effects__label')){
    element = element.querySelector('span');
  }

  if(element.classList.contains('effects__preview')) {
    if(currentEffect !== '') {
      uploadingPicture.classList.remove(currentEffect);
    }

    sliderItem.noUiSlider.set(Slider.MAX);
    sliderValue.value = sliderItem.noUiSlider.get();

    currentEffect = element.classList[1];
    uploadingPicture.classList.add(currentEffect);
    uploadingPicture.style.filter = effects[currentEffect.replace('effects__preview--', '')]();
  }
};

const setEffects = () => {
  currentEffect = 'effects__preview--none';

  uploadingPicture.style.filter = effects.none();
};

sliderItem.noUiSlider.on('change', onSliderChange);
effectsList.addEventListener('click', onEffectsClick);

export{setEffects};
