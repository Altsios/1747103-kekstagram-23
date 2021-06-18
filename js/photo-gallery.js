import {renderPictures} from './thumbnails-viewer.js';
import {showPhoto} from './photo-viewer.js';

const picturesElement = document.querySelector('.pictures');

const createPhotoGallery = (photoDescriptionList)=> {

  if(picturesElement && photoDescriptionList && photoDescriptionList.length > 0){

    renderPictures(photoDescriptionList);

    const thumbnailToPhotoDescriptionMapper = new Map();
    const thumbnailElements = picturesElement.querySelectorAll('.picture__img');

    for(let i = 0; i < thumbnailElements.length; i++){
      thumbnailToPhotoDescriptionMapper.set(thumbnailElements[i], i);
    }

    picturesElement.onclick = (evt) => {
      const target = evt.target;
      if(target.className === 'picture__img'){

        const photoDescription = photoDescriptionList[thumbnailToPhotoDescriptionMapper.get(target)];

        if(photoDescription){
          showPhoto(photoDescription);
        }
      }
    };
  }
};

export {createPhotoGallery};
