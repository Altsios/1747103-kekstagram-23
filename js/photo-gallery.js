import {renderPictures} from './thumbnails-viewer.js';
import {showPhoto} from './photo-viewer.js';

const picturesElement = document.querySelector('.pictures');

const createPhotoGallery = (photoDescriptionList)=> {

  if(photoDescriptionList && photoDescriptionList.length > 0){

    renderPictures(photoDescriptionList);

    if(picturesElement){
      picturesElement.onclick = (evt) => {
        const target = evt.target;
        if(target.className === 'picture__img'){

          const pictureBaseUrl = target.src;
          const baseUrl = location.origin + location.pathname;
          const pictureUrl = pictureBaseUrl.replace(baseUrl,'');

          const photoDescription = photoDescriptionList.find((photo) => photo.url === pictureUrl);
          if(photoDescription){
            showPhoto(photoDescription);
          }
        }
      };
    }
  }
};

export {createPhotoGallery};
