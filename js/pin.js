'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var templatePin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  // отрисовка меток
  var renderPin = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.descriptionObjects.length; i++) {
      var pinElement = templatePin.cloneNode(true);
      pinElement.style.left = window.data.descriptionObjects[i].offer.location.x + 'px';
      pinElement.style.top = window.data.descriptionObjects[i].offer.location.y + 'px';
      pinElement.querySelector('img').src = window.data.descriptionObjects[i].author.avatar;
      pinElement.querySelector('img').alt = window.data.descriptionObjects[i].offer.title;

      fragment.append(pinElement);
    }
    mapPins.append(fragment);
  };
  // получение координат метки
  var getCoordinatePin = function () {
    var box = mapPins.getBoundingClientRect();
    var pin = mainPin.getBoundingClientRect();
    var leftGap = box.left + pageXOffset;
    var pinCenterY = window.data.PIN__HEIGHT / 2;
    var pinCenterX = window.data.PIN__WIDTH / 2;
    var pinActiveY = window.data.PIN__HEIGHT + window.data.PIN__TAIL;
    var pinX = Math.floor((pin.left + pageXOffset) - leftGap + pinCenterX);
    var pinY;
    if (adForm.classList.contains('ad-form--disabled')) {
      pinY = Math.floor((pin.top + pageYOffset) + pinCenterY);
    } else {
      pinY = Math.floor((pin.top + pageYOffset) + pinActiveY);
    }
    return pinX + ', ' + pinY;
  };

  window.pin = {
    renderPin: renderPin,
    getCoordinatePin: getCoordinatePin
  };
})();
