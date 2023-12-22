const Scale = {
  STEP: 25,
  MAX: 100,
  MIN: 25,
};

const uploadingOverlay = document.querySelector('.img-upload__overlay');
const uploadingPicture = uploadingOverlay.querySelector('.img-upload__preview').querySelector('img');
const scale = uploadingOverlay.querySelector('.img-upload__scale');
const scalerField = scale.querySelector('.scale__control--value');

const changeScale = (scaleCoefficient) => {
  let scaleNumber = Number(scalerField.value.replace('%', '')) + scaleCoefficient * Scale.STEP;

  if(scaleNumber < Scale.MIN) {
    scaleNumber = Scale.MIN;
  }
  else if (scaleNumber > Scale.MAX) {
    scaleNumber = Scale.MAX;
  }

  scalerField.value = `${scaleNumber}%`;
  uploadingPicture.style.transform = `scale(${scaleNumber / 100})`;
};

const onScaleButtonClick = (evt) => {
  if(evt.target.matches('button')) {
    let coefficient = 1;
    if(evt.target.matches('.scale__control--smaller')) {
      coefficient = -1;
    }

    changeScale(coefficient);
  }
};

const scalingPhotos = () => {
  scalerField.value = `${Scale.MAX}%`;
  uploadingPicture.style.transform = `scale(${Scale.MAX / 100})`;
};

scale.addEventListener('click', onScaleButtonClick);

export{scalingPhotos};
