import { getRandomInt } from './utils.js';

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

  return Array(sentenceCount).fill().map(() => getRandomArrayElement(MESSAGES)).join(' ');
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
  const comments = new Array(PHOTO_COUNT).fill().map(()=>[]);

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
  id: id + MIN_PHOTO_DESCRIPTION_ID,
  url: `photos/${id + MIN_PHOTO_DESCRIPTION_ID}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInt(MIN_LIKES_COUNT,MAX_LIKES_COUNT),
  comments: randomPhotoComments[id],
});

const createPhotoDescriptionList = (photoCount) => (new Array(photoCount !== undefined ? photoCount : PHOTO_COUNT).fill().map((_element, index)=>createPhotoDescription(index)));

export {createPhotoDescriptionList};
