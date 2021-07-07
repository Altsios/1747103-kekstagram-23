import {createPhotoGallery} from './photo-gallery.js';
import {setPhotoUploaderFormSubmit} from './photo-uploader-form.js';
import {getData, sendData} from './api.js';
import {showErrorMsgOnTop, showSuccessPhotoUploadedMsg, showErrorPhotoUploadedMsg} from './alert-shower.js';

getData((photo) => {
  createPhotoGallery(photo);
},(message) => {
  showErrorMsgOnTop(message);
});

setPhotoUploaderFormSubmit(sendData, showSuccessPhotoUploadedMsg, showErrorPhotoUploadedMsg);
