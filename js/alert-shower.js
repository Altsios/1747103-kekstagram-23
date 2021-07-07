import {isEscEvent} from './utils.js';

const TIMEOUT_ERROR_MSG = 5000;

const successTemplateElement = document.querySelector('#success');
const errorTemplateElement = document.querySelector('#error');

let onAlertShowerKeyDown = null;

const hideMessage = (element) => {
  element.remove();
  document.removeEventListener('keydown', onAlertShowerKeyDown);
};

const addKeydownEventListener = (element, cb) => (evt) => {
  if(isEscEvent(evt)){
    if(cb){
      cb();
    }
    hideMessage(element);
  }
};

const onAlertShowerBtnClick = (element, cb) => {
  if(cb){
    cb();
  }
  hideMessage(element);
};

const onAlertShowerClickOutside = (evt, element, selector, cb) => {
  if(evt.target.matches(selector)){
    if(cb){
      cb();
    }
    hideMessage(element);
  }
};

const showSuccessPhotoUploadedMsg = (cb) => {

  const successTemplate = successTemplateElement
    .content
    .querySelector('.success');

  const successElement = successTemplate.cloneNode(true);

  successElement.style.zIndex = 100;
  document.body.append(successElement);

  const btnSuccesElement = successElement.querySelector('.success__button');

  successElement.addEventListener('click', (evt) => onAlertShowerClickOutside(evt, successElement, '.success', cb));
  btnSuccesElement.addEventListener('click', () => onAlertShowerBtnClick(successElement, cb));
  onAlertShowerKeyDown = addKeydownEventListener(successElement, cb);
  document.addEventListener('keydown', onAlertShowerKeyDown);
};


const showErrorPhotoUploadedMsg = (cb) => {

  const errorTemplate = errorTemplateElement
    .content
    .querySelector('.error');

  const errorElement = errorTemplate.cloneNode(true);

  errorElement.style.zIndex = 100;
  document.body.append(errorElement);

  const btnErrorElement = errorElement.querySelector('.error__button');

  errorElement.addEventListener('click', (evt) => onAlertShowerClickOutside(evt, errorElement, '.error', cb));
  btnErrorElement.addEventListener('click', () => onAlertShowerBtnClick(errorElement, cb));
  onAlertShowerKeyDown = addKeydownEventListener(errorElement, cb);
  document.addEventListener('keydown', onAlertShowerKeyDown);
};

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
