'use strict';

(function () {
  var PIN__WIDTH = 65;
  var PIN__HEIGHT = 65;
  var PIN__TAIL = 19;
  var OBJECT_COUNT = 5;
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

  // заполнение массивов данными
  var createStat = function (count) {
    for (var i = 1; i <= count; i++) {
      var author = 'img/avatars/user0' + i + '.png';
      authors.push(author);
      var price = Math.floor((Math.random() * 100) + 1) * 1000;
      prices.push(price);
    }
  };
  // создание массива объектов
  var createDescriptionArr = function (count) {
    for (var i = 0; i < count; i++) {
      var description = {
        'author': {
          'avatar': authors[i]
        },
        'offer': {
          'title': titles[i],
          'address': addresses[i],
          'price': prices[i],
          'type': TYPES[window.util.getRandomStat(TYPES)],
          'rooms': ROOMS[window.util.getRandomStat(ROOMS)],
          'guests': GUESTS[window.util.getRandomStat(GUESTS)],
          'checkin': CHECK_IN_DATES[window.util.getRandomStat(CHECK_IN_DATES)],
          'checkout': CHECKOUTS[window.util.getRandomStat(CHECKOUTS)],
          'features': window.util.getRandomLengthArr(FEATURES),
          'description': descriptions[i],
          'photos': window.util.getRandomLengthArr(photos),
          'location': {
            'x': LOCATIONS[0][i],
            'y': LOCATIONS[1][i]
          }
        }
      };
      descriptionObjects.push(description);
    }
  };

  // заполнение массивов данными
  createStat(OBJECT_COUNT);
  // создание массива объектов
  createDescriptionArr(OBJECT_COUNT);

  window.data = {
    PIN__WIDTH: PIN__WIDTH,
    PIN__HEIGHT: PIN__HEIGHT,
    PIN__TAIL: PIN__TAIL,
    OBJECT_COUNT: OBJECT_COUNT,
    TYPES: TYPES,
    ROOMS: ROOMS,
    GUESTS: GUESTS,
    CHECK_IN_DATES: CHECK_IN_DATES,
    CHECKOUTS: CHECKOUTS,
    FEATURES: FEATURES,
    LOCATIONS: LOCATIONS,
    authors: authors,
    titles: titles,
    addresses: addresses,
    prices: prices,
    descriptions: descriptions,
    photos: photos,
    descriptionObjects: descriptionObjects,
    createStat: createStat,
    createDescriptionArr: createDescriptionArr
  };
})();
