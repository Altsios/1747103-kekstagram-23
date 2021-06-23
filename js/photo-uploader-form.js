import {isEscEvent} from './utils.js';

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

const clearFormFields = () => {
  fileInputElement.value = null;
  textHashTagsElement.value = null;
  textDescriptionElement.value = null;
};

const closePhotoUploaderForm = () =>{
  imgEditorElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPhotoUploaderEscKeydown);
  btnUploadCancelElement.removeEventListener('click', onPhotoUploaderCloseClick);

  textHashTagsElement.removeEventListener('keydown', onPhotoUploaderUserInputKeyDown);
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
  textDescriptionElement.addEventListener('keydown', onPhotoUploaderUserInputKeyDown);
};

const onPhotoUploaderInputChanged = () =>{
  openPhotoUploaderForm();
};

fileInputElement.addEventListener('change', onPhotoUploaderInputChanged);

const setPhotoUploaderFormSubmit = () => {

};

export {setPhotoUploaderFormSubmit};
