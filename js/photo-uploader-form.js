import {isEscEvent} from './utils.js';

const photoUploaderForm = document.querySelector('#upload-select-image');
const fileInputElement = photoUploaderForm.querySelector('#upload-file');
const imgEditorElement = photoUploaderForm.querySelector('.img-upload__overlay');
const btnUploadCancelElement = photoUploaderForm.querySelector('#upload-cancel');

let onPhotoUploaderEscKeydown = undefined;
let onPhotoUploaderCloseClick = undefined;


const closePhotoUploaderForm =() =>{
  imgEditorElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPhotoUploaderEscKeydown);
  btnUploadCancelElement.removeEventListener('click', onPhotoUploaderCloseClick);

  fileInputElement.value = null;
};

onPhotoUploaderEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePhotoUploaderForm();
  }
};

onPhotoUploaderCloseClick = () => {
  closePhotoUploaderForm();
};


const openPhotoUploaderForm =() =>{
  imgEditorElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onPhotoUploaderEscKeydown);
  btnUploadCancelElement.addEventListener('click', onPhotoUploaderCloseClick);
};

const onInputChanged = () =>{
  openPhotoUploaderForm();
};

fileInputElement.addEventListener('change', onInputChanged);

const setPhotoUploaderFormSubmit = () => {

};

export {setPhotoUploaderFormSubmit};
