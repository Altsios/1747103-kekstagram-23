import {isEscEvent} from './utils.js';

const AVATAR_HEIGHT_WIDTH = 35;
const SHOWED_COMMENTS_COUNT = 5;

const bigPictureElement = document.querySelector('.big-picture');
const imgElement = bigPictureElement.querySelector('.big-picture__img img');
const captionElement = bigPictureElement.querySelector('.social__caption');
const likesElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const commentsElement = bigPictureElement.querySelector('.social__comments');
const btnPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');

const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');

let currentPhoto;

const setLoadedCommentsCount = (value) => {
  commentCountElement.childNodes[0].textContent = `${value} из `;
};

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

const renderNextComments = () => {

  const comments = currentPhoto.comments;

  const commentsFragment = document.createDocumentFragment();

  const renderCommentsFromIdx = commentsElement.childElementCount;
  const renderCommentsToIdx =  renderCommentsFromIdx + SHOWED_COMMENTS_COUNT;

  comments.slice(renderCommentsFromIdx, renderCommentsToIdx)
    .forEach((comment) => commentsFragment.appendChild(createCommentElem(comment)));
  commentsElement.appendChild(commentsFragment);

  const loadedCommentsCount = commentsElement.childElementCount;
  if(loadedCommentsCount === comments.length){
    commentsLoader.classList.add('hidden');
  }
  else{
    commentsLoader.classList.remove('hidden');
  }

  setLoadedCommentsCount(loadedCommentsCount);
};

const onPhotoViewerCommentsLoaderClick = () => {
  renderNextComments();
};

const renderPhoto = () => {

  imgElement.src = currentPhoto.url;
  imgElement.alt = currentPhoto.description;

  captionElement.textContent = currentPhoto.description;

  likesElement.textContent = currentPhoto.likes;
};

const setCommentsInfo = () => {
  commentsCountElement.textContent = currentPhoto.comments.length;
  commentsElement.innerHTML ='';
};

let onPhotoViewerEscKeydown = undefined;
let onPhotoViewerCloseClick = undefined;

const hidePhoto = () => {

  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoViewerEscKeydown);

  btnPictureCancelElement.removeEventListener('click', onPhotoViewerCloseClick);
  commentsLoader.removeEventListener('click', onPhotoViewerCommentsLoaderClick);
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

  currentPhoto = photoDescription;

  if(currentPhoto){
    document.body.classList.add('modal-open');
    bigPictureElement.classList.remove('hidden');

    document.addEventListener('keydown', onPhotoViewerEscKeydown);
    btnPictureCancelElement.addEventListener('click', onPhotoViewerCloseClick);
    commentsLoader.addEventListener('click', onPhotoViewerCommentsLoaderClick);

    setCommentsInfo();
    renderPhoto();
    renderNextComments();
  }
};

export {showPhoto};
