import {renderPictures} from './thumbnails-viewer.js';
import {showPhoto} from './photo-viewer.js';

const picturesElement = document.querySelector('.pictures');

const createPhotoGallery = (photoDescriptionList)=> {

  if(photoDescriptionList && photoDescriptionList.length > 0){

    renderPictures(photoDescriptionList);

    const pictureImgElements = picturesElement.querySelectorAll('.picture__img');
    const thumbnails = pictureImgElements ? Array.from(pictureImgElements) : [];

    picturesElement.onclick = (evt) => {
      const target = evt.target;
      if(target.className === 'picture__img'){

        const photoDescription = photoDescriptionList[thumbnails.indexOf(target)];

        photoDescription && showPhoto(photoDescription);
      }
    };
  }
};

export {createPhotoGallery};
