
'use strict';

/**
 * Вызывается каждый раз когда игрок проходит уровень
 *
 * @param {Canvas} ctx canvas на котором рисуется игра
 * @param {Array} names массив с именами игроков прошедших уровень
 * @param {Array} times массив со временем прохождения уровня соответствующего игрока из names
 */
window.renderStatistics = function (ctx, names, times) {

  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  ctx.strokeRect(100, 10, 420, 270);

  // устанавливаем параметры для тени
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = '#000';
  ctx.font = '14px PT Mono';

  // не даём применять тень ко всему что есть в прямоугольнике
  ctx.shadowColor = 'transparent';

  var headerText = 'Ура вы победили!\nСписок результатов:';
  var array = headerText.split('\n');
  var height = 20;

  for (var i = 0; i < array.length; i++) {
    height += 20;
    ctx.fillText(array[i], 120, height);
  }

  var histogramHeight = 150;
  var maxIndex = getMaxIndex(times);
  var maxTime = times[maxIndex];
  var step = histogramHeight / (maxTime - 0);

  ctx.fillText('Худшее вермя: ' + maxTime.toFixed(2) + 'мс у игрока ' + names[maxIndex], 120, 80);

  var barHeight = 150;
  var barWidth = 40;
  var indent = barWidth + 50;
  var initialX = 120;
  var initialY = 90;
  var verticalIndent = 15;

  for (var i = 0; i < times.length; i++) {
    ctx.fillStyle = getBarRandomColorOrDefault(names[i]);
    ctx.fillRect(initialX + indent * i, initialY + (barHeight - times[i] * step), barWidth, times[i] * step);
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(names[i], initialX + indent * i, initialY + barHeight + verticalIndent);
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

  return name === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 77, 255, 0.' + getRandomIntInclusive(1, 10) + ')';
}

/**
 * Вовзращает случайное число в указанном интервале
 * @param {Number} min минимальное число
 * @param {Number} max максимальное числа
 * @return {Number} случайное значение
 */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
