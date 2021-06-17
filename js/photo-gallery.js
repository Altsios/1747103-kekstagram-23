import {renderPictures} from './thumbnails-viewer.js';
import {showPhoto} from './photo-viewer.js';

const createPhotoGallery = (photoDescriptionList)=> {
  if(photoDescriptionList && photoDescriptionList.length > 0){
    showPhoto(photoDescriptionList[0]);
    renderPictures(photoDescriptionList);
  }
};

export {createPhotoGallery};
