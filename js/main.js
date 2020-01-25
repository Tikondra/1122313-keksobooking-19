'use strict';

var OBJECT_COUNT = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 4, 5];
var GUESTS = [1, 2, 3, 4, 5];
var CHECK_IN_DATES = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var LOCATIONS = [
  [300, 400, 500, 250, 300, 350, 600, 750],
  [200, 300, 250, 350, 500, 350, 500, 450]
];

var authors = [];
var titles = ['Студия', 'Квартира', 'Дом', 'Коттедж', 'Комната', 'Офис', 'Гараж', 'Сарай'];
var addresses = ['600, 350', '500, 400', '550, 380', '400, 530', '430, 500', '410, 400', '530, 350', '620, 300'];
var prices = [];
var descriptions = ['Студия', 'Квартира', 'Дом', 'Коттедж', 'Комната', 'Офис', 'Гараж', 'Сарай'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var descriptionObjects = [];

var map = document.querySelector('.map');
var templatePin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

// заполнение массивов данными
var createStat = function (count) {
  for (var i = 1; i <= count; i++) {
    var author = 'img/avatars/user0' + i + '.png';
    authors.push(author);
    var price = Math.floor((Math.random() * 100) + 1) * 1000;
    prices.push(price);
  }
};
// выбор рандомного элемента из массива
var getRandomStat = function (arr) {
  var randomStat = Math.floor(Math.random() * arr.length);
  return randomStat;
};
// выбор рандомной длины массива
var getRandomLengthArr = function (arr) {
  var start = Math.floor(Math.random() * arr.length);
  var end = (Math.floor(Math.random() * (arr.length - start) + 1) + start);
  var newArr = arr.slice(start, end);
  return newArr;
};
// создание массива объектов
var createDescritionArr = function (count) {
  for (var i = 0; i < count; i++) {
    var description = {
      'author': {
        'avatar': authors[i]
      },
      'offer': {
        'title': titles[i],
        'address': addresses[i],
        'price': prices[i],
        'type': TYPES[getRandomStat(TYPES)],
        'rooms': ROOMS[getRandomStat(ROOMS)],
        'guests': GUESTS[getRandomStat(GUESTS)],
        'checkin': CHECK_IN_DATES[getRandomStat(CHECK_IN_DATES)],
        'checkout': CHECKOUTS[getRandomStat(CHECKOUTS)],
        'features': getRandomLengthArr(FEATURES),
        'description': descriptions[i],
        'photos': getRandomLengthArr(photos),
        'location': {
          'x': LOCATIONS[0][i],
          'y': LOCATIONS[1][i]
        }
      }
    };
    descriptionObjects.push(description);
  }
};
// отрисовка меток
var renderPin = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < descriptionObjects.length; i++) {
    var pinElement = templatePin.cloneNode(true);
    pinElement.style.left = descriptionObjects[i].offer.location.x + 'px';
    pinElement.style.top = descriptionObjects[i].offer.location.y + 'px';
    pinElement.querySelector('img').src = descriptionObjects[i].author.avatar;
    pinElement.querySelector('img').alt = descriptionObjects[i].offer.title;

    fragment.appendChild(pinElement);
  }
  mapPins.appendChild(fragment);
};

createStat(OBJECT_COUNT);
createDescritionArr(OBJECT_COUNT);
renderPin();

map.classList.remove('map--faded');
