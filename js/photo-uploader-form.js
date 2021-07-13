import {isEscEvent} from './utils.js';
import {addScaling, removeScaling} from './photo-scaler.js';
import {addPhotoFilterEffects, removePhotoFilterEffects} from './photo-filter.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const HASHTAG_WRONG_SYMBOLS_PATTERN = /[^#\d\sа-яa-z]+/i;
const HASHTAG_PATTERN = new RegExp(`^#[\\dа-яa-z]{1,${MAX_HASHTAG_LENGTH - 1}}$`, 'i');

const photoUploaderFormElement = document.querySelector('#upload-select-image');
const fileInputElement = photoUploaderFormElement.querySelector('#upload-file');
const imgEditorElement = photoUploaderFormElement.querySelector('.img-upload__overlay');
const btnUploadCancelElement = photoUploaderFormElement.querySelector('#upload-cancel');
const textHashTagsElement = photoUploaderFormElement.querySelector('.text__hashtags');
const textDescriptionElement = photoUploaderFormElement.querySelector('.text__description');
const imgUploadPreviewElement = photoUploaderFormElement.querySelector('.img-upload__preview img');

let onPhotoUploaderFormEscKeydown = undefined;
let onBtnUploadCancelClick = undefined;

let isErrorOccurred = false;
let isFormSubmitted = false;

const toggleFormSubmiittedState = () => {
  isFormSubmitted = !isFormSubmitted;
};

const clearErrorStatus = () => {
  isErrorOccurred = false;
  toggleFormSubmiittedState();
};

const setErrorStatus = () => {
  isErrorOccurred = true;
  toggleFormSubmiittedState();
};

const cancelKeyDown = (evt) => {
  evt.stopPropagation();
};

const onTextHashTagsKeyDown = (evt) => cancelKeyDown(evt);
const onTextDescriptionKeyDown = (evt) => cancelKeyDown(evt);

const onTextHashTagsInput = () => {
  textHashTagsElement.setCustomValidity('');
  textHashTagsElement.reportValidity();
};

const validateHashTags = () => {
  const hashTagsStr = textHashTagsElement.value.trim();
  const invalidities = new Set();

  if(hashTagsStr){
    if (HASHTAG_WRONG_SYMBOLS_PATTERN.test(hashTagsStr)) {
      invalidities.add('Хэш-теги содержат некорректные символы! Допускаются: #, цифры, буквы и пробел в качестве разделителя.');
    }

    const hashTagArr = hashTagsStr.split(' ').filter((hashTag) => hashTag);

    if(hashTagArr.length > MAX_HASHTAG_COUNT){
      invalidities.add('Нельзя указать больше 5 хэш-тегов!');
    }

    hashTagArr.forEach((hashTag, index) => {
      if(!HASHTAG_PATTERN.test(hashTag)){
        invalidities.add(`Неверный формат хэш-тэга: "${hashTag}". Хэш-тег должен начинаться с "#" и содержать от 1 до ${MAX_HASHTAG_LENGTH - 1} цифро-буквенных символов.`);
      }

      const hashTagInLowerCase = hashTag.toLowerCase();

      if(hashTagArr.some((elem, elemIdx) => elem.toLowerCase() === hashTagInLowerCase && index < elemIdx)){
        invalidities.add(`Хэш-тег ${hashTagInLowerCase} уже указан!`);
      }
    });
  }

  textHashTagsElement.setCustomValidity(invalidities.size > 0 ? Array.from(invalidities).join('\n') : '');
  textHashTagsElement.reportValidity();

  return invalidities.size === 0;
};

const onTextHashTagsBlur = (evt) => {

  if(evt.relatedTarget === btnUploadCancelElement){
    return;
  }

  validateHashTags();
};

const clearFormFields = () => {
  fileInputElement.value = null;
  textHashTagsElement.value = null;
  textDescriptionElement.value = null;

  textHashTagsElement.setCustomValidity('');
};

const closePhotoUploaderForm = () =>{
  if(isErrorOccurred){
    return;
  }

  imgEditorElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPhotoUploaderFormEscKeydown);
  btnUploadCancelElement.removeEventListener('click', onBtnUploadCancelClick);

  textHashTagsElement.removeEventListener('keydown', onTextHashTagsKeyDown);
  textHashTagsElement.removeEventListener('blur', onTextHashTagsBlur);
  textHashTagsElement.removeEventListener('input', onTextHashTagsInput);
  textDescriptionElement.removeEventListener('keydown', onTextDescriptionKeyDown);

  clearFormFields();
  removeScaling();
  removePhotoFilterEffects();
};

onPhotoUploaderFormEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    closePhotoUploaderForm();
  }
};

onBtnUploadCancelClick = () => {
  closePhotoUploaderForm();
};

const openPhotoUploaderForm = () => {
  isFormSubmitted = false;
  imgEditorElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onPhotoUploaderFormEscKeydown);
  btnUploadCancelElement.addEventListener('click', onBtnUploadCancelClick);

  textHashTagsElement.addEventListener('keydown', onTextHashTagsKeyDown);
  textHashTagsElement.addEventListener('blur', onTextHashTagsBlur);
  textHashTagsElement.addEventListener('input', onTextHashTagsInput);
  textDescriptionElement.addEventListener('keydown', onTextDescriptionKeyDown);

  addScaling();
  addPhotoFilterEffects();
};

const onPhotoUploaderInputChanged = () =>{
  const file = fileInputElement.files[0];

  if(!file) {
    closePhotoUploaderForm();
    return;
  }

  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      imgUploadPreviewElement.src = reader.result;
    });

    reader.readAsDataURL(file);
  }

  openPhotoUploaderForm();
};

fileInputElement.addEventListener('change', onPhotoUploaderInputChanged);

const setPhotoUploaderFormSubmit = (sendData, onSuccess, onFail) => {

  photoUploaderFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if(isFormSubmitted || !validateHashTags()){
      return;
    }

    sendData(
      () => {
        clearErrorStatus();
        onSuccess(closePhotoUploaderForm);
      },
      () => {
        setErrorStatus();
        onFail(clearErrorStatus);
      },
      new FormData(evt.target),
    );
  });
};

export {setPhotoUploaderFormSubmit};
