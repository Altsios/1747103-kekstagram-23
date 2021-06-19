import {isEscEvent} from './utils.js';

const AVATAR_HEIGHT_WIDTH = 35;

const bigPictureElement = document.querySelector('.big-picture');
const imgElement = bigPictureElement.querySelector('.big-picture__img img');
const captionElement = bigPictureElement.querySelector('.social__caption');
const likesElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const commentsElement = bigPictureElement.querySelector('.social__comments');
const btnPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');

//временно скрываем блоки
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
commentCountElement.classList.add('hidden');

const commentsLoader = bigPictureElement.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');

const createCommentElem = ({avatar, name, message}) =>{
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = avatar;
  avatarElement.alt = name;
  avatarElement.width = AVATAR_HEIGHT_WIDTH;
  avatarElement.height = AVATAR_HEIGHT_WIDTH;

  const commentTextElem = document.createElement('p');
  commentTextElem.classList.add('social__text');
  commentTextElem.textContent = message;

  commentElement.appendChild(avatarElement);
  commentElement.appendChild(commentTextElem);

  return commentElement;
};

const renderPhoto = ({url, description, likes}) => {

  imgElement.src = url;
  imgElement.alt = description;

  captionElement.textContent = description;

  likesElement.textContent = likes;
};

const renderComments = (comments) => {

  commentsElement.innerHTML ='';
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => commentsFragment.appendChild(createCommentElem(comment)));
  commentsElement.appendChild(commentsFragment);

  commentsCountElement.textContent = comments.length;
};

let onPhotoViewerEscKeydown = undefined;
let onPhotoViewerCloseClick = undefined;

const hidePhoto = () => {

  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoViewerEscKeydown);

  btnPictureCancelElement.removeEventListener('click', onPhotoViewerCloseClick);
};

onPhotoViewerCloseClick = () => {
  hidePhoto();
};

onPhotoViewerEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hidePhoto();
  }
};

const showPhoto = (photoDescription) => {

  document.body.classList.add('modal-open');
  bigPictureElement.classList.remove('hidden');

  document.addEventListener('keydown', onPhotoViewerEscKeydown);

  btnPictureCancelElement.addEventListener('click', onPhotoViewerCloseClick);

  renderPhoto(photoDescription);
  renderComments(photoDescription.comments);
};

export {showPhoto};
