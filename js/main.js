/**
 * {@link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5_%D1%81%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE%D0%B3%D0%BE_%D1%86%D0%B5%D0%BB%D0%BE%D0%B3%D0%BE_%D1%87%D0%B8%D1%81%D0%BB%D0%B0_%D0%B2_%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%BD%D0%BE%D0%BC_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B2%D0%B0%D0%BB%D0%B5_%D0%B2%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE Источник}.
 * Возвращает случайное положительное целое число из переданного положительного диапазона включительно
 * @param {number} minValue мин. значение в диапазоне (положительное целое число, включая ноль)
 * @param {number} maxValue мак. значение в диапазоне (положительное целое число, включая ноль)
 * @return {number}
 */
const getRandomInt = (minValue, maxValue) => {
  let absIntMinValue = Math.floor(Math.abs(minValue));
  let absIntMaxValue = Math.floor(Math.abs(maxValue));

  if (absIntMinValue > absIntMaxValue) {
    [absIntMaxValue, absIntMinValue] = [absIntMinValue, absIntMaxValue];
  }

  return (
    Math.floor(Math.random() * (absIntMaxValue - absIntMinValue + 1)) +
    absIntMinValue
  );
};

/**
 * Проверка максимальной длины строки
 * @param {string} checkedString строка для проверки
 * @param {number} maxStringLength максимальная длина строки
 * @return {boolean} true, если строка проходит по длине, и false — если не проходит
 */
const checkMaxStringLength = (checkedString, maxStringLength) =>
  checkedString.length <= maxStringLength;

getRandomInt(0, 10);
checkMaxStringLength('Keks', 5);

const NAMES = [
  'Иван',
  'Олег',
  'Мария',
  'Анастасия',
  'Вася',
  'Аноним',
  'Масяня',
  'Евгения',
  'Кекс',
  'Наруто',
  'Агент 007',
  'Валентин',
  'Пирожочек2020',
];

const DESCRIPTIONS = [
  'Милые котики:)',
  'Даже в Питере бывает солнышко!',
  'Поймал дзен',
  'Позитив!',
  'Угадаете место?',
  'А как вы проводите выходные?',
  'Потрясающий закат!',
  'Ночной дожор',
  'Без слов...',
  'Райское местечко',
  'Покатушки!',
  'Время чудить!:)',
  'Море, солнце, пляж!',
  'Грущу',
  'Дома',
  'Верните мой 2007',
  'Наконец-то, пятница',
  'Ползу к цели...',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const PHOTO_COUNT = 25;
const MIN_PHOTO_DESCRIPTION_ID = 1;
const MIN_COMMENTS_COUNT = 0;
const MAX_COMMENTS_COUNT = 3;
const MIN_MESSAGES_COUNT = 1;
const MAX_MESSAGES_COUNT = 2;
const MIN_NUMBER_IN_AVATAR_NAME= 1;
const MAX_NUMBER_IN_AVATAR_NAME = 6;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;

const getRandomArrayElement = (elements) =>
  elements[getRandomInt(0, elements.length - 1)];

/**
 * Получение случайного сообщения из нескольких элеиментов массива MESSAGES
 */
const getRandomMessage = () => {
  const sentenceCount = getRandomInt(MIN_MESSAGES_COUNT, MAX_MESSAGES_COUNT);
  let message = '';

  // eslint-disable-next-line id-length
  for(let i = 0; i< sentenceCount; i++){
    message += ` ${getRandomArrayElement(MESSAGES)}`;
  }

  message = message.substr(1);

  return message;
};

const createRandomComment = (id) => ({
  id: id,
  avatar: `img/avatar-${getRandomInt(MIN_NUMBER_IN_AVATAR_NAME, MAX_NUMBER_IN_AVATAR_NAME)}.svg`,
  message: getRandomMessage(),
  name: getRandomArrayElement(NAMES),
});

/**
 * Генерация массива массивов с объектами - комментариями,
 * где id сообщения - уникальное случайное число от 1 до кол-ва сгенерированных комментариев
 */
const createRandomComments = () => {
  const randomCommentsCountsPerItem = new Array(PHOTO_COUNT)
    .fill()
    .map(() => getRandomInt(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT));
  const totalCommentsCount = randomCommentsCountsPerItem.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
  );

  const orderedIds = new Array(totalCommentsCount)
    .fill()
    .map((_element, index) => index + 1);

  let randomIndex;
  const comments = new Array(PHOTO_COUNT).fill([]);//.map(()=>new Array()); //без map каждый новый элемент будет не независимым массивом, а ссылкой на 1 и тот же

  randomCommentsCountsPerItem.forEach((commentsCount, index) => {

    // eslint-disable-next-line id-length
    for(let i = 1; i<=commentsCount && orderedIds.length; i++){
      randomIndex = getRandomInt(0,orderedIds.length - 1);
      comments[index].push(createRandomComment(orderedIds[randomIndex]));
      orderedIds.splice(randomIndex, 1);
    }
  });

  return comments;
};

const randomPhotoComments = createRandomComments();

const createPhotoDescription = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInt(MIN_LIKES_COUNT,MAX_LIKES_COUNT),
  comments: randomPhotoComments[id - 1],
});

// eslint-disable-next-line no-unused-vars
const photoGallery = new Array(PHOTO_COUNT).fill().map((_element, index)=>createPhotoDescription(index + MIN_PHOTO_DESCRIPTION_ID));
