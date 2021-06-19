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
if(commentCountElement){
  commentCountElement.classList.add('hidden');
}

const commentsLoader = bigPictureElement.querySelector('.comments-loader');
if(commentCountElement){
  commentsLoader.classList.add('hidden');
}

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
  if(imgElement){
    imgElement.src = url;
    imgElement.alt = description;
  }

  if(captionElement){
    captionElement.textContent = description;
  }

  if(likesElement){
    likesElement.textContent = likes;
  }
};

const renderComments = (comments) => {

  if(commentsElement){
    commentsElement.innerHTML ='';
    const commentsFragment = document.createDocumentFragment();

    comments.forEach((comment) => commentsFragment.appendChild(createCommentElem(comment)));
    commentsElement.appendChild(commentsFragment);
  }

  if(commentsCountElement){
    commentsCountElement.textContent = comments.length;
  }
};

const onPhotoViewerCloseClick = () => {
  // eslint-disable-next-line no-use-before-define
  hidePhoto();
};

const onPhotoViewerEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    hidePhoto();
  }
};

const hidePhoto = () => {
  if(bigPictureElement){
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPhotoViewerEscKeydown);

    if(btnPictureCancelElement){
      btnPictureCancelElement.removeEventListener('click', onPhotoViewerCloseClick);
    }
  }
};

const showPhoto = (photoDescription) => {

  if(bigPictureElement){
    document.body.classList.add('modal-open');
    bigPictureElement.classList.remove('hidden');

    document.addEventListener('keydown', onPhotoViewerEscKeydown);
    if(btnPictureCancelElement){
      btnPictureCancelElement.addEventListener('click', onPhotoViewerCloseClick);
    }

    renderPhoto(photoDescription);
    renderComments(photoDescription.comments);
  }
};

export {showPhoto};
