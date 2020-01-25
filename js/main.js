'use strict';

var objectCount = 8;
var authors = [];
var titles = ['Студия', 'Квартира', 'Дом', 'Коттедж', 'Комната', 'Офис', 'Гараж', 'Сарай'];
var addresses = ['600, 350', '500, 400', '550, 380', '400, 530', '430, 500', '410, 400', '530, 350', '620, 300'];
var prices = [];
var types = ['palace', 'flat', 'house', 'bungalo'];
var rooms = [1, 2, 3, 4, 5];
var guests = [1, 2, 3, 4, 5];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var descriptions = ['Студия', 'Квартира', 'Дом', 'Коттедж', 'Комната', 'Офис', 'Гараж', 'Сарай'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var locations = [
  [300, 400, 500, 250, 300, 350, 600, 750],
  [200, 300, 250, 350, 500, 350, 500, 450]
];
var descriptionObjects = [];
var map = document.querySelector('.map');
var templatePin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

map.classList.remove('map--faded');

var createStat = function (count) {
  for (var i = 1; i <= count; i++) {
    var author = 'img/avatars/user0' + i + '.png';
    authors.push(author);
    var price = Math.floor((Math.random() * 100) + 1) * 1000;
    prices.push(price);
  }
};
var getRandomStat = function (arr) {
  var randomStat = Math.floor(Math.random() * arr.length);
  return randomStat;
};
var getRandomLengthArr = function (arr) {
  var start = Math.floor(Math.random() * arr.length);
  var end = (Math.floor(Math.random() * (arr.length - start) + 1) + start);
  var newArr = arr.slice(start, end);
  return newArr;
};

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
        'type': types[getRandomStat(types)],
        'rooms': rooms[getRandomStat(rooms)],
        'guests': guests[getRandomStat(guests)],
        'checkin': checkins[getRandomStat(checkins)],
        'checkout': checkouts[getRandomStat(checkouts)],
        'features': getRandomLengthArr(features),
        'description': descriptions[i],
        'photos': getRandomLengthArr(photos),
        'location': {
          'x': locations[0][i],
          'y': locations[1][i]
        }
      }
    };
    descriptionObjects.push(description);
  }
};

createStat(objectCount);
createDescritionArr(objectCount);

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

renderPin();

