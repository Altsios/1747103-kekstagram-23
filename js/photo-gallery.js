import {renderPictures} from './thumbnails-viewer.js';
import {showPhoto} from './photo-viewer.js';

const getShowPhotoСlosure = (photoDescription) => () => showPhoto(photoDescription);

const addThumbnailClickHandler = (thumbnail, photoDescription) => {
  thumbnail.addEventListener('click', getShowPhotoСlosure(photoDescription));
};

const createPhotoGallery = (photoDescriptionList)=> {
  if(photoDescriptionList && photoDescriptionList.length > 0){
    renderPictures(photoDescriptionList);

    const thumbnails = document.querySelectorAll('.picture__img');
    for (let i = 0; i < thumbnails.length; i++) {
      addThumbnailClickHandler(thumbnails[i], photoDescriptionList[i]);
    }
  }
};

export {createPhotoGallery};
