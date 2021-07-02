const CHROME_EFFECT = 'chrome';
const SEPIA_EFFECT = 'sepia';
const MARVIN_EFFECT = 'marvin';
const PHOBOS_EFFECT = 'phobos';
const HEAT_EFFECT = 'heat';

const DEFAULT_SLIDER_OPTIONS = {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
};

const EFFECT_TEMPLATE_STR_REPLACEMENT = '{EFF_LVL}';

const EFFECTS_PREVIEW_BASE_CSS_CLASS = 'effects__preview--';

const EFFECT_TO_FILTER = {
  chrome: `grayscale(${EFFECT_TEMPLATE_STR_REPLACEMENT})`,
  sepia: `sepia(${EFFECT_TEMPLATE_STR_REPLACEMENT})`,
  marvin: `invert(${EFFECT_TEMPLATE_STR_REPLACEMENT}%)`,
  phobos: `blur(${EFFECT_TEMPLATE_STR_REPLACEMENT}px)`,
  heat: `brightness(${EFFECT_TEMPLATE_STR_REPLACEMENT}`,
};

const imgUploadEffectLevelElement = document.querySelector('.img-upload__effect-level');
const sliderElement = imgUploadEffectLevelElement.querySelector('.effect-level__slider');
const effectsListElement = document.querySelector('.effects__list');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

let currentPhotoEffectCSSClass;
let currentFilterEffect;

noUiSlider.create(sliderElement, {
  ...DEFAULT_SLIDER_OPTIONS,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0): value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});


const getSliderOptionsByEffect = (imgEffect) =>{
  const sliderOptions = DEFAULT_SLIDER_OPTIONS;

  switch(imgEffect){

    case CHROME_EFFECT:
    case SEPIA_EFFECT:
      sliderOptions.range.min = 0;
      sliderOptions.range.max = 1;
      sliderOptions.step = 0.1;
      break;
    case MARVIN_EFFECT:
      sliderOptions.range.min = 1;
      sliderOptions.range.max = 100;
      sliderOptions.step = 1;
      break;
    case PHOBOS_EFFECT:
      sliderOptions.range.min = 0;
      sliderOptions.range.max = 3;
      sliderOptions.step = 0.1;
      break;
    case HEAT_EFFECT:
      sliderOptions.range.min = 1;
      sliderOptions.range.max = 3;
      sliderOptions.step = 0.1;
      break;
  }

  sliderOptions.start = sliderOptions.range.max;
  return sliderOptions;
};

const applyFilterEffectToImg = (value) => {

  imgUploadPreview.style.filter = currentFilterEffect ? currentFilterEffect.replace(EFFECT_TEMPLATE_STR_REPLACEMENT, value) : null;
};

sliderElement.noUiSlider.on('update', (values, handle) => {
  effectLevelValueElement.value = values[handle];
  applyFilterEffectToImg(effectLevelValueElement.value);
});


const configurePhotoEditor = (imgEffect) => {
  const newPhotoEffectCSSClass = EFFECTS_PREVIEW_BASE_CSS_CLASS + imgEffect;
  imgUploadPreview.classList.remove(currentPhotoEffectCSSClass);

  currentPhotoEffectCSSClass = newPhotoEffectCSSClass;
  imgUploadPreview.classList.add(newPhotoEffectCSSClass);

  currentFilterEffect = EFFECT_TO_FILTER[imgEffect];

  const sliderOptions = getSliderOptionsByEffect(imgEffect);

  if(sliderOptions){
    sliderElement.noUiSlider.updateOptions(sliderOptions);
    sliderElement.noUiSlider.set(sliderOptions.start);
  }

  if(currentFilterEffect){
    imgUploadEffectLevelElement.removeAttribute('hidden');
  }
  else{
    imgUploadEffectLevelElement.setAttribute('hidden', true);
  }
};

const onPhotoFilterEffectsListElementCheck = (evt) => {
  const target = evt.target;

  if(target.matches('.effects__radio')){
    configurePhotoEditor(target.value);
  }
};

const addPhotoFilterEffects = () => {
  effectsListElement.addEventListener('change', onPhotoFilterEffectsListElementCheck);
};

const removePhotoFilterEffects = () => {
  effectsListElement.removeEventListener('change', onPhotoFilterEffectsListElementCheck);
};


configurePhotoEditor(effectsListElement.querySelector('.effects__radio:checked').value);

export {addPhotoFilterEffects, removePhotoFilterEffects};
