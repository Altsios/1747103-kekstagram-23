const picturesElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture');

const renderPictures = (photoDescriptionList) => {
  if(picturesElement && pictureTemplateElement){

    const picturesFragment = document.createDocumentFragment();
    const pictureTemplate = pictureTemplateElement
      .content
      .querySelector('.picture');

    photoDescriptionList.forEach(({url, likes, comments}) => {
      const pictureElement = pictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = url;
      pictureElement.querySelector('.picture__comments').textContent = comments.length;
      pictureElement.querySelector('.picture__likes').textContent = likes;
      picturesFragment.appendChild(pictureElement);
    });

    picturesElement.appendChild(picturesFragment);
  }
};

export {renderPictures};
