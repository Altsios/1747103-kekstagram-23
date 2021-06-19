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

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {getRandomInt, checkMaxStringLength, isEscEvent};
