'use strict';

var LEFT_MOUSE_BUTTON_KEY = 1;
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';
var PIN__WIDTH = 65;
var PIN__HEIGHT = 65;
var PIN__TAIL = 19;
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
var mainPin = mapPins.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adress = adForm.querySelector('input[name=address]');
var guestsSelect = adForm.querySelector('select[name=capacity]');

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
// отрисовка карточки
var renderCard = function (index) {
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
  cardElement.querySelector('.popup__title').textContent = descriptionObjects[index].offer.title;
  // адрес
  cardElement.querySelector('.popup__text--address').textContent = descriptionObjects[index].offer.address;
  // цена
  cardElement.querySelector('.popup__text--price').textContent = descriptionObjects[index].offer.price + 'P/ночь';
  // тип жилья
  if (descriptionObjects[index].offer.type === 'palace') {
    type.textContent = 'Дворец';
  } else if (descriptionObjects[index].offer.type === 'flat') {
    type.textContent = 'Квартира';
  } else if (descriptionObjects[index].offer.type === 'house') {
    type.textContent = 'Дом';
  } else {
    type.textContent = 'Бунгало';
  }
  // количество комнат и гостей
  if (descriptionObjects[index].offer.rooms === 1) {
    rooms = ' комната для ';
  } else if (descriptionObjects[index].offer.rooms > 4) {
    rooms = ' комнат для ';
  }
  if (descriptionObjects[index].offer.guests === 1) {
    guests = ' гостя';
  }
  roomsForGuests.textContent = descriptionObjects[index].offer.rooms + rooms + descriptionObjects[index].offer.guests + guests;
  // время заеда и выезда
  cardElement.querySelector('.popup__text--time')
    .textContent = 'Заезд после ' + descriptionObjects[index].offer.checkin + ', выезд до ' + descriptionObjects[index].offer.checkout;
  // доступные функции
  for (var i = 0; i < featuresItem.length; i++) {
    featuresItem[i].style.display = 'none';
    for (var j = 0; j < descriptionObjects[index].offer.features.length; j++) {
      var availableFeatures = descriptionObjects[index].offer.features[j];
      if (featuresItem[i].className.indexOf(availableFeatures) >= 0 && featuresItem[i].className.indexOf(availableFeatures) < 35) {
        featuresItem[i].style.display = 'inline-block';
      }
    }
  }
  // описание
  cardElement.querySelector('.popup__description').textContent = descriptionObjects[index].offer.description;
  // фото
  for (var k = 0; k < descriptionObjects[index].offer.photos.length; k++) {
    var photoElement = photo.cloneNode(true);
    photoElement.src = descriptionObjects[index].offer.photos[k];
    popupPhotos.append(photoElement);
  }
  allPhoto[0].remove();
  // аватар
  cardElement.querySelector('.popup__avatar').src = descriptionObjects[index].author.avatar;
  filter.before(cardElement);
};
// деактивация инпутов
var deactivateInputs = function (state) {
  var mapFilterForm = filter.querySelector('.map__filters');
  var mapFilters = mapFilterForm.querySelectorAll('.map__filter');
  var mapCheckboxFieldset = mapFilterForm.querySelector('.map__features');
  var formAvatarInput = adForm.querySelector('.ad-form-header__input');
  var adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
  if (state === true) {
    mapFilterForm.classList.add('map__filters--disabled');
    adForm.classList.add('ad-form--disabled');
  } else {
    mapFilterForm.classList.remove('map__filters--disabled');
    adForm.classList.remove('ad-form--disabled');
  }
  mapFilters.forEach(function (item) {
    item.disabled = state;
  });
  adFormFieldsets.forEach(function (item) {
    item.disabled = state;
  });
  mapCheckboxFieldset.disabled = state;
  formAvatarInput.disabled = state;
};
// активация страницы
var onActivationPage = function (evt) {
  if (evt.which === LEFT_MOUSE_BUTTON_KEY) {
    activationPage();
  }
};
var onActivationPageEnt = function (evt) {
  if (evt.key === ENTER_KEY) {
    activationPage();
  }
};
var activationPage = function () {
  deactivateInputs(false);
  map.classList.remove('map--faded');
  adress.value = getCoordinatePin();
  // отрисовка меток
  renderPin();
  getPins();
  mainPin.removeEventListener('mousedown', onActivationPage);
  mainPin.removeEventListener('keydown', onActivationPageEnt);
};
// получение координат метки
var getCoordinatePin = function () {
  var box = mapPins.getBoundingClientRect();
  var pin = mainPin.getBoundingClientRect();
  var leftGap = box.left + pageXOffset;
  var pinCenterY = PIN__HEIGHT / 2;
  var pinCenterX = PIN__WIDTH / 2;
  var pinActiveY = PIN__HEIGHT + PIN__TAIL;
  var pinX = Math.floor((pin.left + pageXOffset) - leftGap + pinCenterX);
  var pinY;
  if (adForm.classList.contains('ad-form--disabled')) {
    pinY = Math.floor((pin.top + pageYOffset) + pinCenterY);
  } else {
    pinY = Math.floor((pin.top + pageYOffset) + pinActiveY);
  }
  return pinX + ', ' + pinY;
};
// проверка соотношения комнат к гостям
var roomsAndGuestsValidation = function () {
  var roomsValue = Number(adForm.querySelector('select[name=rooms').value);
  var guestsValue = Number(guestsSelect.value);

  if (roomsValue !== 100 && guestsValue === 0) {
    guestsSelect.setCustomValidity('Гостей слишком мало');
  } else if (roomsValue < guestsValue || (guestsValue === 0 && roomsValue !== 100) || (roomsValue === 100 && guestsValue !== 0)) {
    guestsSelect.setCustomValidity('Гостей слишком много');
  } else {
    guestsSelect.setCustomValidity('');
  }
};
// показ и скрытие карточки
var getPins = function () {
  var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
  var onShowCard = function (index) {
    var activeCard = map.querySelector('.map__card');
    if (activeCard) {
      activeCard.remove();
    }
    renderCard(index);
    var cardCloseBtn = map.querySelector('.popup__close');
    cardCloseBtn.addEventListener('click', onHideCard);
    document.addEventListener('keydown', onHideCardEsc);
  };
  var onHideCard = function () {
    map.querySelector('.map__card').remove();
    document.removeEventListener('keydown', onHideCardEsc);
  };
  var onHideCardEsc = function (evt) {
    if (evt.key === ESC_KEY) {
      onHideCard();
    }
  };
  pins.forEach(function (item, index) {
    item.addEventListener('click', function () {
      onShowCard(index);
    });
  });
};

// заполнение массивов данными
createStat(OBJECT_COUNT);
// создание массива объектов
createDescritionArr(OBJECT_COUNT);
// деактивация инпутов
deactivateInputs(true);
// начальное значение адресса
adress.value = getCoordinatePin();
// активация страницы
mainPin.addEventListener('mousedown', onActivationPage);
mainPin.addEventListener('keydown', onActivationPageEnt);
// проверка соответствия гостей и комнат
adForm.addEventListener('input', roomsAndGuestsValidation);
