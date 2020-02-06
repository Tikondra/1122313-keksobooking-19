'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var filter = map.querySelector('.map__filters-container');
  var templateCard = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  // тип жилья
  var getType = function (objectType) {
    if (objectType === 'palace') {
      return 'Дворец';
    } else if (objectType === 'flat') {
      return 'Квартира';
    } else if (objectType === 'house') {
      return 'Дом';
    } else {
      return 'Бунгало';
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
    for (var k = 0; k < photos.length; k++) {
      var photoElement = photo.cloneNode(true);
      photoElement.src = photos[k];
      popupPhotos.append(photoElement);
    }
    allPhoto[0].remove();
  };

  // отрисовка карточки
  var renderCard = function (index) {
    var cardElement = templateCard.cloneNode(true);
    var type = cardElement.querySelector('.popup__type');
    var roomsForGuests = cardElement.querySelector('.popup__text--capacity');
    // Заголовок
    cardElement.querySelector('.popup__title').textContent = window.data.descriptionObjects[index].offer.title;
    // адрес
    cardElement.querySelector('.popup__text--address').textContent = window.data.descriptionObjects[index].offer.address;
    // цена
    cardElement.querySelector('.popup__text--price').textContent = window.data.descriptionObjects[index].offer.price + 'P/ночь';
    // тип жилья
    type.textContent = getType(window.data.descriptionObjects[index].offer.type);
    // количество комнат и гостей
    roomsForGuests.textContent = getRoomsAndGuests(window.data.descriptionObjects[index].offer.rooms, window.data.descriptionObjects[index].offer.guests);
    // время заеда и выезда
    cardElement.querySelector('.popup__text--time')
      .textContent = 'Заезд после ' + window.data.descriptionObjects[index].offer.checkin + ', выезд до ' + window.data.descriptionObjects[index].offer.checkout;
    // доступные функции
    getAvailableFeatures(cardElement, window.data.descriptionObjects[index].offer.features);
    // описание
    cardElement.querySelector('.popup__description').textContent = window.data.descriptionObjects[index].offer.description;
    // фото
    getPhoto(cardElement, window.data.descriptionObjects[index].offer.photos);
    // аватар
    cardElement.querySelector('.popup__avatar').src = window.data.descriptionObjects[index].author.avatar;
    filter.before(cardElement);
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

  window.card = {
    renderCard: renderCard,
    getPins: getPins
  };
})();
