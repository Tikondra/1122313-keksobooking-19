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
var mapPins = map.querySelector('.map__pins');
var templateCard = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var filter = map.querySelector('.map__filters-container');

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

    fragment.append(pinElement);
  }
  mapPins.append(fragment);
};

var renderCard = function () {
  var cardElement = templateCard.cloneNode(true);
  var type = cardElement.querySelector('.popup__type');
  var roomsForGuests = cardElement.querySelector('.popup__text--capacity');
  var rooms = ' комнаты для ';
  var guests = ' гостей';
  var featuresList = cardElement.querySelector('.popup__features');
  var featuresItem = featuresList.querySelectorAll('.popup__feature');
  var popupPhotos = cardElement.querySelector('.popup__photos');
  var photo = popupPhotos.querySelector('img');
  var allPhoto = popupPhotos.querySelectorAll('img');
  // Заголовок
  cardElement.querySelector('.popup__title').textContent = descriptionObjects[0].offer.title;
  // адрес
  cardElement.querySelector('.popup__text--address').textContent = descriptionObjects[0].offer.address;
  // цена
  cardElement.querySelector('.popup__text--price').textContent = descriptionObjects[0].offer.price + 'P/ночь';
  // тип жилья
  if (descriptionObjects[0].offer.type === 'palace') {
    type.textContent = 'Дворец';
  } else if (descriptionObjects[0].offer.type === 'flat') {
    type.textContent = 'Квартира';
  } else if (descriptionObjects[0].offer.type === 'house') {
    type.textContent = 'Дом';
  } else {
    type.textContent = 'Бунгало';
  }
  // количество комнат и гостей
  if (descriptionObjects[0].offer.rooms === 1) {
    rooms = ' комната для ';
  } else if (descriptionObjects[0].offer.rooms > 4) {
    rooms = ' комнат для ';
  }
  if (descriptionObjects[0].offer.guests === 1) {
    guests = ' гостя';
  }
  roomsForGuests.textContent = descriptionObjects[0].offer.rooms + rooms + descriptionObjects[0].offer.guests + guests;
  // время заеда и выезда
  cardElement.querySelector('.popup__text--time')
    .textContent = 'Заезд после ' + descriptionObjects[0].offer.checkin + ', выезд до ' + descriptionObjects[0].offer.checkout;
  // доступные функции
  for (var i = 0; i < featuresItem.length; i++) {
    featuresItem[i].style.display = 'none';
    for (var j = 0; j < descriptionObjects[0].offer.features.length; j++) {
      var availableFeatures = descriptionObjects[0].offer.features[j];
      if (featuresItem[i].className.indexOf(availableFeatures) >= 0 && featuresItem[i].className.indexOf(availableFeatures) < 35) {
        featuresItem[i].style.display = 'inline-block';
      }
    }
  }
  // описание
  cardElement.querySelector('.popup__description').textContent = descriptionObjects[0].offer.description;
  // фото
  for (var k = 0; k < descriptionObjects[0].offer.photos.length; k++) {
    var photoElement = photo.cloneNode(true);
    photoElement.src = descriptionObjects[0].offer.photos[k];
    popupPhotos.append(photoElement);
  }
  allPhoto[0].remove();
  // аватар
  cardElement.querySelector('.popup__avatar').src = descriptionObjects[0].author.avatar;
  filter.before(cardElement);
};

createStat(OBJECT_COUNT);
createDescritionArr(OBJECT_COUNT);
renderPin();
renderCard();
map.classList.remove('map--faded');

