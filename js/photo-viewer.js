const AVATAR_HEIGHT_WIDTH = 35;

const bigPictureElement = document.querySelector('.big-picture');
const imgElement = bigPictureElement.querySelector('.big-picture__img img');
const captionElement = bigPictureElement.querySelector('.social__caption');
const likesElement = bigPictureElement.querySelector('.social__likes');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const commentsElement = bigPictureElement.querySelector('.social__comments');

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

const showPhoto = (photoDescription) => {

  bigPictureElement.classList.remove('hidden');

  imgElement.src = photoDescription.url;
  imgElement.alt = photoDescription.description;
  captionElement.textContent = photoDescription.description;
  likesElement.textContent = photoDescription.likes;
  commentsCountElement.textContent = photoDescription.comments.length;

  commentsElement.innerHTML ='';
  const commentsFragment = document.createDocumentFragment();

  photoDescription.comments.forEach((comment) => commentsFragment.appendChild(createCommentElem(comment)));
  commentsElement.appendChild(commentsFragment);
};

export {showPhoto};
