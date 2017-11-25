
'use strict';

var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var INDENT = BAR_WIDTH + 50;
var INITIAL_X = 120;
var INITIAL_Y = 90;
var VERTICAL_INDENT = 15;
var HISTOGRAM_HEIGHT = 150;

var RESULTS_TEXT_INITIAL_X = INITIAL_X;
var RESULTS_TEXT_INITIAL_Y = 80;
var RESULTS_WINDOW_BACKGROUND_COLOR = 'rgba(255, 255, 255, 1.0)';

var DEFAULT_USER_NAME_COLOR = 'rgba(255, 0, 0, 1)';
var BLACK_COLOR = 'rgba(0, 0, 0, 1.0)';

var SHADOW_OFFSET = 10;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var SHADOW_FONT = '14px PT Mono';

var TITLE_TEXT = 'Ура вы победили!\nСписок результатов:';

/**
 * Вызывается каждый раз когда игрок проходит уровень
 *
 * @param {Canvas} ctx canvas на котором рисуется игра
 * @param {Array} names массив с именами игроков прошедших уровень
 * @param {Array} times массив со временем прохождения уровня соответствующего игрока из names
 */
window.renderStatistics = function (ctx, names, times) {

  ctx.fillStyle = RESULTS_WINDOW_BACKGROUND_COLOR;
  ctx.strokeRect(100, 10, 420, 270);

  // устанавливаем параметры для тени
  ctx.shadowColor = SHADOW_COLOR;
  ctx.shadowOffsetX = SHADOW_OFFSET;
  ctx.shadowOffsetY = SHADOW_OFFSET;
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = BLACK_COLOR;
  ctx.font = SHADOW_FONT;

  // не даём применять тень ко всему что есть в прямоугольнике
  ctx.shadowColor = 'transparent';

  var headerText = TITLE_TEXT;
  var array = headerText.split('\n');
  var height = 20;

  for (var i = 0; i < array.length; i++) {
    height += 20;
    ctx.fillText(array[i], INITIAL_X, height);
  }

  var maxIndex = getMaxIndex(times);
  var maxTime = times[maxIndex];
  var step = HISTOGRAM_HEIGHT / (maxTime - 0);

  ctx.fillText('Худшее вермя: ' + maxTime.toFixed(2) + 'мс у игрока ' + names[maxIndex], RESULTS_TEXT_INITIAL_X, RESULTS_TEXT_INITIAL_Y);

  for (var i = 0; i < times.length; i++) {
    // рисуем гистограмму
    ctx.fillStyle = getBarRandomColorOrDefault(names[i]);
    ctx.fillRect(INITIAL_X + INDENT * i, INITIAL_Y + (BAR_HEIGHT - times[i] * step), BAR_WIDTH, times[i] * step);
    // сбрасываем цвет и рисуем текст
    ctx.fillStyle = BLACK_COLOR;
    ctx.fillText(names[i], INITIAL_X + INDENT * i, INITIAL_Y + BAR_HEIGHT + VERTICAL_INDENT);
  }
}

/**
 * Возвращает индекс максимального элемента в массиве
 * @param {Array} times массив для поиска
 * @return {Number} индекс
 */
var getMaxIndex = function (times) {
  var max = -1;
  var maxIndex = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];

    if (time > max) {
      max = time;
      maxIndex = i;
    }
  }
  return maxIndex;
}

/**
 * Возвращает синий цвет со случайной прозрачностью или черный если имя 'Вы'
 * @param {String} массив имен
 * @return {String} цвет
 */
function getBarRandomColorOrDefault(name) {

  return name === 'Вы' ? DEFAULT_USER_NAME_COLOR : 'rgba(0, 77, 255, 0.' + getRandomIntInclusive(1, 10) + ')';
}

/**
 * Возвращает случайное число в указанном интервале
 * @param {Number} min минимальное число
 * @param {Number} max максимальное числа
 * @return {Number} случайное значение
 */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
