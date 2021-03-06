'use strict';

(function () {
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_X = -30;
  var MAX_X = 1160;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var filter = map.querySelector('.map__filters-container');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var address = adForm.querySelector('input[name=address]');
  var templateCard = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var TypeOfHousing = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };
  var InputTypeOfHousing = {
    PALACE: 'palace',
    FLAT: 'flat',
    HOUSE: 'house',
    BUNGALO: 'bungalo'
  };

  // тип жилья
  var getType = function (objectType) {
    if (objectType === InputTypeOfHousing.PALACE) {
      return TypeOfHousing.PALACE;
    } else if (objectType === InputTypeOfHousing.FLAT) {
      return TypeOfHousing.FLAT;
    } else if (objectType === InputTypeOfHousing.HOUSE) {
      return TypeOfHousing.HOUSE;
    } else {
      return TypeOfHousing.BUNGALO;
    }
  };
  // комнаты и гости
  var getRoomsAndGuests = function (rooms, guests) {
    var roomsValue = ' комнаты для ';
    var guestsValue = ' гостей';
    if (rooms === 1) {
      roomsValue = ' комната для ';
    } else if (rooms > 4) {
      roomsValue = ' комнат для ';
    }
    if (guests === 1) {
      guestsValue = ' гостя';
    }
    return rooms + roomsValue + guests + guestsValue;
  };
  // доступные функции
  var getAvailableFeatures = function (card, features) {
    var featuresList = card.querySelector('.popup__features');
    var featuresItem = featuresList.querySelectorAll('.popup__feature');
    for (var i = 0; i < featuresItem.length; i++) {
      featuresItem[i].style.display = 'none';
      for (var j = 0; j < features.length; j++) {
        var availableFeatures = features[j];
        if (featuresItem[i].className.indexOf(availableFeatures) >= 0 && featuresItem[i].className.indexOf(availableFeatures) < 35) {
          featuresItem[i].style.display = 'inline-block';
        }
      }
    }
  };
  // фото
  var getPhoto = function (card, photos) {
    var popupPhotos = card.querySelector('.popup__photos');
    var photo = popupPhotos.querySelector('img');
    var allPhoto = popupPhotos.querySelectorAll('img');
    photos.forEach(function (item) {
      var photoElement = photo.cloneNode(true);
      photoElement.src = item;
      popupPhotos.append(photoElement);
    });
    allPhoto[0].remove();
  };
  // отрисовка карточки
  var renderCard = function (data, index) {
    var cardElement = templateCard.cloneNode(true);
    var type = cardElement.querySelector('.popup__type');
    var roomsForGuests = cardElement.querySelector('.popup__text--capacity');
    // Заголовок
    cardElement.querySelector('.popup__title').textContent = data[index].offer.title;
    // адрес
    cardElement.querySelector('.popup__text--address').textContent = data[index].offer.address;
    // цена
    cardElement.querySelector('.popup__text--price').textContent = data[index].offer.price + 'P/ночь';
    // тип жилья
    type.textContent = getType(data[index].offer.type);
    // количество комнат и гостей
    roomsForGuests.textContent = getRoomsAndGuests(data[index].offer.rooms, data[index].offer.guests);
    // время заеда и выезда
    cardElement.querySelector('.popup__text--time')
      .textContent = 'Заезд после ' + data[index].offer.checkin + ', выезд до ' + data[index].offer.checkout;
    // доступные функции
    getAvailableFeatures(cardElement, data[index].offer.features);
    // описание
    cardElement.querySelector('.popup__description').textContent = data[index].offer.description;
    // фото
    getPhoto(cardElement, data[index].offer.photos);
    // аватар
    cardElement.querySelector('.popup__avatar').src = data[index].author.avatar;
    filter.before(cardElement);
  };
  // удаление карточки
  var deleteCard = function () {
    var card = map.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };
  // показ и скрытие карточки
  var getPins = function (data) {
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    var onShowCard = function (index) {
      var activeCard = map.querySelector('.map__card');
      if (activeCard) {
        activeCard.remove();
      }
      renderCard(data, index);
      var cardCloseBtn = map.querySelector('.popup__close');
      cardCloseBtn.addEventListener('click', onHideCard);
      document.addEventListener('keydown', onHideCardEsc);
    };
    var onHideCard = function () {
      deleteCard();
      document.removeEventListener('keydown', onHideCardEsc);
    };
    var onHideCardEsc = function (evt) {
      if (evt.key === window.util.ESC_KEY) {
        onHideCard();
      }
    };
    pins.forEach(function (item, index) {
      item.addEventListener('click', function () {
        onShowCard(index);
      });
    });
  };
  // ограничения метки по вертикали
  var getMaxMinY = function (top) {
    if (top < MIN_Y) {
      return MIN_Y;
    } else if (top > MAX_Y) {
      return MAX_Y;
    }
    return top;
  };
  // ограничения метки по горизонтали
  var getMaxMinX = function (left) {
    if (left < MIN_X) {
      return MIN_X;
    } else if (left > MAX_X) {
      return MAX_X;
    } else {
      return left;
    }
  };
  // Перетаскивание метки
  var onMovePin = function (evt) {
    evt.preventDefault();
    if (map.classList.contains('map--faded') === false) {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        var top = mainPin.offsetTop - shift.y;
        var left = mainPin.offsetLeft - shift.x;

        mainPin.style.top = getMaxMinY(top) + 'px';
        mainPin.style.left = getMaxMinX(left) + 'px';

        address.value = window.pin.getCoordinatePin();
      };
      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        address.value = window.pin.getCoordinatePin();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  // перетаскивание метки
  mainPin.addEventListener('mousedown', onMovePin);

  window.card = {
    renderCard: renderCard,
    getPins: getPins,
    deleteCard: deleteCard
  };
})();

