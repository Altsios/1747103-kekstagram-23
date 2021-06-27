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

let renderNextComments = null;

const onPhotoViewerCommentsLoaderClick = () => {
  renderNextComments();
};

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

const renderPhoto = ({url, description, likes}) => {

  imgElement.src = url;
  imgElement.alt = description;

  captionElement.textContent = description;

  likesElement.textContent = likes;
};

const setCommentsInfo = (comments) => {
  commentsCountElement.textContent = comments.length;
  commentsElement.innerHTML ='';
};

const createCommentsRenderer = (comments) => {

  let page = 0;

  return () => {

    const commentsFragment = document.createDocumentFragment();
    const firstCommentOnPageIndex = page * SHOWED_COMMENTS_COUNT;
    const lastCommentOnPageIndex = (page + 1) * SHOWED_COMMENTS_COUNT;

    comments.slice(firstCommentOnPageIndex, lastCommentOnPageIndex).forEach((comment) => commentsFragment.appendChild(createCommentElem(comment)));
    commentsElement.appendChild(commentsFragment);

    let loadedCommentsCount;
    if(lastCommentOnPageIndex >= comments.length){
      commentsLoader.classList.add('hidden');
      loadedCommentsCount = comments.length;
    }
    else{
      commentsLoader.classList.remove('hidden');
      loadedCommentsCount= lastCommentOnPageIndex;
    }

    setLoadedCommentsCount(loadedCommentsCount);

    page++;
  };
};

let onPhotoViewerEscKeydown = undefined;
let onPhotoViewerCloseClick = undefined;

const hidePhoto = () => {

  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoViewerEscKeydown);

  btnPictureCancelElement.removeEventListener('click', onPhotoViewerCloseClick);
  commentsLoader.removeEventListener('click', onPhotoViewerCommentsLoaderClick);

  renderNextComments = null;
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

  renderNextComments = createCommentsRenderer(photoDescription.comments);

  document.body.classList.add('modal-open');
  bigPictureElement.classList.remove('hidden');

  document.addEventListener('keydown', onPhotoViewerEscKeydown);
  btnPictureCancelElement.addEventListener('click', onPhotoViewerCloseClick);
  commentsLoader.addEventListener('click', onPhotoViewerCommentsLoaderClick);

  setCommentsInfo(photoDescription.comments);
  renderPhoto(photoDescription);
  renderNextComments();
};

export {showPhoto};
