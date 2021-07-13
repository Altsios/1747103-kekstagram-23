import {isEscEvent} from './utils.js';

const TIMEOUT_ERROR_MSG = 5000;

const PhotoUploadedStatus = {
  SUCCESS: 'success',
  ERROR: 'error',
};

const successTemplateElement = document.querySelector('#success');
const errorTemplateElement = document.querySelector('#error');

let onPhotoUploadedMsgKeyDown = null;

const hideMessage = (element) => {
  element.remove();
  document.removeEventListener('keydown', onPhotoUploadedMsgKeyDown);
};

const addKeydownEventListener = (element, cb) => (evt) => {
  evt.preventDefault();
  if(isEscEvent(evt)){
    cb();
    hideMessage(element);
  }
};

const onPhotoUploadedMsgBtnClick = (element, cb) => {
  cb();
  hideMessage(element);
};

const onPhotoUploadedMsgClickOutside = (evt, element, selector, cb) => {
  if(evt.target.matches(selector)){
    cb();
    hideMessage(element);
  }
};

const createPhotoUploadedMsg  = (photoUploadedStatus, templateElement, cb) => {

  const elementClass = `.${photoUploadedStatus}`;

  const messageTemplate = templateElement
    .content
    .querySelector(elementClass);

  const messageElement = messageTemplate.cloneNode(true);

  messageElement.style.zIndex = 100;
  document.body.append(messageElement);

  const messageBtnElement = messageElement.querySelector(`${elementClass}__button`);

  messageElement.addEventListener('click', (evt) => onPhotoUploadedMsgClickOutside(evt, messageElement, elementClass, cb));
  messageBtnElement.addEventListener('click', () => onPhotoUploadedMsgBtnClick(messageElement, cb));
  onPhotoUploadedMsgKeyDown = addKeydownEventListener(messageElement, cb);
  document.addEventListener('keydown', onPhotoUploadedMsgKeyDown);
};


const showSuccessPhotoUploadedMsg = (cb) => createPhotoUploadedMsg(PhotoUploadedStatus.SUCCESS, successTemplateElement, cb);
const showErrorPhotoUploadedMsg = (cb) => createPhotoUploadedMsg(PhotoUploadedStatus.ERROR, errorTemplateElement, cb);


const showErrorMsgOnTop = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('topErrorMessage');
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, TIMEOUT_ERROR_MSG);
};

export {showErrorMsgOnTop, showSuccessPhotoUploadedMsg, showErrorPhotoUploadedMsg};
