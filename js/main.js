import { createPhotoDescriptionList } from './data.js';
import {createPhotoGallery} from './photo-gallery.js';
import {setPhotoUploaderFormSubmit} from './photo-uploader-form.js';

createPhotoGallery(createPhotoDescriptionList());
setPhotoUploaderFormSubmit();
