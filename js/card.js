'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var filter = map.querySelector('.map__filters-container');
  var templateCard = document.querySelector('#card')
    .content
    .querySelector('.map__card');

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
    cardElement.querySelector('.popup__title').textContent = window.data.descriptionObjects[index].offer.title;
    // адрес
    cardElement.querySelector('.popup__text--address').textContent = window.data.descriptionObjects[index].offer.address;
    // цена
    cardElement.querySelector('.popup__text--price').textContent = window.data.descriptionObjects[index].offer.price + 'P/ночь';
    // тип жилья
    if (window.data.descriptionObjects[index].offer.type === 'palace') {
      type.textContent = 'Дворец';
    } else if (window.data.descriptionObjects[index].offer.type === 'flat') {
      type.textContent = 'Квартира';
    } else if (window.data.descriptionObjects[index].offer.type === 'house') {
      type.textContent = 'Дом';
    } else {
      type.textContent = 'Бунгало';
    }
    // количество комнат и гостей
    if (window.data.descriptionObjects[index].offer.rooms === 1) {
      rooms = ' комната для ';
    } else if (window.data.descriptionObjects[index].offer.rooms > 4) {
      rooms = ' комнат для ';
    }
    if (window.data.descriptionObjects[index].offer.guests === 1) {
      guests = ' гостя';
    }
    roomsForGuests.textContent = window.data.descriptionObjects[index].offer.rooms + rooms + window.data.descriptionObjects[index].offer.guests + guests;
    // время заеда и выезда
    cardElement.querySelector('.popup__text--time')
      .textContent = 'Заезд после ' + window.data.descriptionObjects[index].offer.checkin + ', выезд до ' + window.data.descriptionObjects[index].offer.checkout;
    // доступные функции
    for (var i = 0; i < featuresItem.length; i++) {
      featuresItem[i].style.display = 'none';
      for (var j = 0; j < window.data.descriptionObjects[index].offer.features.length; j++) {
        var availableFeatures = window.data.descriptionObjects[index].offer.features[j];
        if (featuresItem[i].className.indexOf(availableFeatures) >= 0 && featuresItem[i].className.indexOf(availableFeatures) < 35) {
          featuresItem[i].style.display = 'inline-block';
        }
      }
    }
    // описание
    cardElement.querySelector('.popup__description').textContent = window.data.descriptionObjects[index].offer.description;
    // фото
    for (var k = 0; k < window.data.descriptionObjects[index].offer.photos.length; k++) {
      var photoElement = photo.cloneNode(true);
      photoElement.src = window.data.descriptionObjects[index].offer.photos[k];
      popupPhotos.append(photoElement);
    }
    allPhoto[0].remove();
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
