const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;

const scaleSmallerBtnElement = document.querySelector('.scale__control--smaller');
const scaleBiggerBtnElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const imgUploadPreviewElement = document.querySelector('.img-upload__preview');

let scaleValue;

const setScaleValue = (value) => {
  if(value > MAX_SCALE || value < MIN_SCALE){
    return;
  }

  scaleValue = value;
  scaleControlValueElement.value = `${scaleValue}%`;
  imgUploadPreviewElement.style.transform = `scale(${scaleValue / 100})`;
};

const onScaleSmallerBtnClick = () => {
  setScaleValue(scaleValue - SCALE_STEP);
};

const onScaleBiggerBtnClick = () => {
  setScaleValue(scaleValue + SCALE_STEP);
};

const addScaling = () => {
  scaleSmallerBtnElement.addEventListener('click', onScaleSmallerBtnClick);
  scaleBiggerBtnElement.addEventListener('click', onScaleBiggerBtnClick);
  setScaleValue(DEFAULT_SCALE);
};

const removeScaling = () => {
  scaleSmallerBtnElement.removeEventListener('click', onScaleSmallerBtnClick);
  scaleBiggerBtnElement.removeEventListener('click', onScaleBiggerBtnClick);
  setScaleValue(DEFAULT_SCALE);
};

export {addScaling, removeScaling};
