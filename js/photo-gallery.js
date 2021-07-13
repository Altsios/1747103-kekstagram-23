import {renderPictures} from './thumbnails-viewer.js';
import {showPhoto} from './photo-viewer.js';
import {debounce} from './utils/debounce.js';

const RANDOM_PHOTO_FIRST_IDX = 0;
const COUNT_OF_RANDOM_PHOTO = 10;
const RERENDER_DELAY = 500;

const picturesElement = document.querySelector('.pictures');
const imgFiltersContainerElement = document.querySelector('.img-filters');
const imgFilterElements = imgFiltersContainerElement.querySelectorAll('.img-filters__button');


const getRandomPhoto = (photoDescriptionList) => photoDescriptionList.slice().sort(() => Math.random() - 0.5)
  .slice(RANDOM_PHOTO_FIRST_IDX, COUNT_OF_RANDOM_PHOTO);

const getMostDiscussedPhoto = (photoDescriptionList) => photoDescriptionList.slice()
  .sort((a, b) => b.comments.length - a.comments.length);

const filterToPhotoProcessAction = {
  'filter-random' : getRandomPhoto,
  'filter-discussed' : getMostDiscussedPhoto,
};


const reloadPhotoGallery = (photoDescriptionList, filter) => {

  let processedPhotoDescriptionList = photoDescriptionList;

  if(filter){
    const processingFunction = filterToPhotoProcessAction[filter.id];
    if(processingFunction){
      processedPhotoDescriptionList = processingFunction(photoDescriptionList);
    }
  }

  renderPictures(processedPhotoDescriptionList);

  const pictureImgElements = picturesElement.querySelectorAll('.picture__img');
  const thumbnails = pictureImgElements ? Array.from(pictureImgElements) : [];

  picturesElement.addEventListener('click',(evt) => {
    const target = evt.target;
    if(target.matches('.picture__img')){

      const photoDescription = processedPhotoDescriptionList[thumbnails.indexOf(target)];

      photoDescription && showPhoto(photoDescription);
    }
  });
};

const setFiltesrAsInactive = () => {
  for(const filter of imgFilterElements){
    filter.classList.remove('img-filters__button--active');
  }
};

const setFilterAsActive = (filterElement) => {
  setFiltesrAsInactive();
  filterElement.classList.add('img-filters__button--active');
};

const createPhotoGallery = (photoDescriptionList)=> {

  if(photoDescriptionList.length === 0){
    return;
  }

  const reloadPhotoOnFilterClick = debounce((filter) => reloadPhotoGallery(photoDescriptionList, filter),RERENDER_DELAY);

  imgFiltersContainerElement.addEventListener('click',(evt) => {
    const target = evt.target;
    if(target.matches('.img-filters__button')){
      setFilterAsActive(target);
      reloadPhotoOnFilterClick(target);
    }
  });

  reloadPhotoGallery(photoDescriptionList);

  imgFiltersContainerElement.classList.remove('img-filters--inactive');
};

export {createPhotoGallery};
