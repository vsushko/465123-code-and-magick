'use strict';

var AMOUNT_OF_WIZARDS = 4;

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)',];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// покажем блок .setup
document.querySelector('.setup').classList.remove('hidden');

// покажем блок .setup-similar
document.querySelector('.setup-similar').classList.remove('hidden');

// шаблон
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

/**
 * Генерирует волшебников в указанном кол-ве
 * @param {Array} amountOfWizards колличество волшебников
 * @returns {Array} массив с волшебниками
 */
var generateWizards = function (amountOfWizards) {
  var generatedWizards = [];

  for (var i = 0; i < amountOfWizards; i++) {
    generatedWizards.push({
      name: NAMES[getRandomIntInclusive(0, NAMES.length - 1)]
        + ' ' + LAST_NAMES[getRandomIntInclusive(0, LAST_NAMES.length - 1)],
      coatColor: COAT_COLORS[getRandomIntInclusive(0, COAT_COLORS.length - 1)],
      eyesColor: EYES_COLORS[getRandomIntInclusive(0, EYES_COLORS.length - 1)]
    })
  }

  return generatedWizards;
}

var wizards = generateWizards(AMOUNT_OF_WIZARDS);

/**
 * Возвращает склонированную ноду волшебника
 * @param {Object} wizard
 * @returns {Object} склонированная нода
 */
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

// вставим сгенерированных вошлебников
var similarListElement = document.querySelector('.setup-similar-list').appendChild(fragment);

