import {isEscEvent} from './utils.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const HASHTAG_WRONG_SYMBOLS_PATTERN = /[^#\d\sа-яa-z]+/i;
const HASHTAG_PATTERN = new RegExp(`^#[\\dа-яa-z]{1,${MAX_HASHTAG_LENGTH - 1}}$`, 'i');

const photoUploaderForm = document.querySelector('#upload-select-image');
const fileInputElement = photoUploaderForm.querySelector('#upload-file');
const imgEditorElement = photoUploaderForm.querySelector('.img-upload__overlay');
const btnUploadCancelElement = photoUploaderForm.querySelector('#upload-cancel');
const textHashTagsElement = photoUploaderForm.querySelector('.text__hashtags');
const textDescriptionElement = photoUploaderForm.querySelector('.text__description');

let onPhotoUploaderEscKeydown = undefined;
let onPhotoUploaderCloseClick = undefined;

const onPhotoUploaderUserInputKeyDown = (evt) => {
  evt.stopPropagation();
};

const onPhotoUploaderTextHashTagInput = () => {
  textHashTagsElement.setCustomValidity('');
  textHashTagsElement.reportValidity();
};

const onPhotoUploaderTextHashTagBlur = () => {

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
};

const clearFormFields = () => {
  fileInputElement.value = null;
  textHashTagsElement.value = null;
  textDescriptionElement.value = null;

  textHashTagsElement.setCustomValidity('');
};

const closePhotoUploaderForm = () =>{
  imgEditorElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPhotoUploaderEscKeydown);
  btnUploadCancelElement.removeEventListener('click', onPhotoUploaderCloseClick);

  textHashTagsElement.removeEventListener('keydown', onPhotoUploaderUserInputKeyDown);
  textHashTagsElement.removeEventListener('blur', onPhotoUploaderTextHashTagBlur);
  textHashTagsElement.removeEventListener('input', onPhotoUploaderTextHashTagInput);
  textDescriptionElement.removeEventListener('keydown', onPhotoUploaderUserInputKeyDown);

  clearFormFields();
};

onPhotoUploaderEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    closePhotoUploaderForm();
  }
};

onPhotoUploaderCloseClick = () => {
  closePhotoUploaderForm();
};

const openPhotoUploaderForm = () => {
  imgEditorElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onPhotoUploaderEscKeydown);
  btnUploadCancelElement.addEventListener('click', onPhotoUploaderCloseClick);

  textHashTagsElement.addEventListener('keydown', onPhotoUploaderUserInputKeyDown);
  textHashTagsElement.addEventListener('blur', onPhotoUploaderTextHashTagBlur);
  textHashTagsElement.addEventListener('input', onPhotoUploaderTextHashTagInput);
  textDescriptionElement.addEventListener('keydown', onPhotoUploaderUserInputKeyDown);
};

const onPhotoUploaderInputChanged = () =>{
  openPhotoUploaderForm();
};

fileInputElement.addEventListener('change', onPhotoUploaderInputChanged);

const setPhotoUploaderFormSubmit = () => {
  //заготовка под работу с api
};

export {setPhotoUploaderFormSubmit};
