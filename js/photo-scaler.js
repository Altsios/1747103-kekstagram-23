const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;

const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
const scaleControlValueElem = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

let scaleValue;

const setScaleValue = (value) => {
  if(value <= MAX_SCALE && value >= MIN_SCALE){
    scaleValue = value;
    scaleControlValueElem.value = `${scaleValue}%`;
    imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
  }
};

const onPhotoEditorScaleSmallerBtnClick = () => {
  setScaleValue(scaleValue - SCALE_STEP);
};

const onPhotoEditorScaleBiggerBtnClick = () => {
  setScaleValue(scaleValue + SCALE_STEP);
};

const addScaling = () => {
  scaleSmallerBtn.addEventListener('click', onPhotoEditorScaleSmallerBtnClick);
  scaleBiggerBtn.addEventListener('click', onPhotoEditorScaleBiggerBtnClick);
  setScaleValue(DEFAULT_SCALE);
};

const removeScaling = () => {
  scaleSmallerBtn.removeEventListener('click', onPhotoEditorScaleSmallerBtnClick);
  scaleBiggerBtn.removeEventListener('click', onPhotoEditorScaleBiggerBtnClick);
  setScaleValue(DEFAULT_SCALE);
};

export {addScaling, removeScaling};
