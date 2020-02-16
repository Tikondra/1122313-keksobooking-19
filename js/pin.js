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
  var renderPin = function (adsData) {
    var fragment = document.createDocumentFragment();
    var countPin = Math.min(adsData.length, window.data.OBJECT_COUNT);

    for (var i = 0; i < countPin; i++) {
      var pinElement = templatePin.cloneNode(true);
      pinElement.style.left = adsData[i].location.x + 'px';
      pinElement.style.top = adsData[i].location.y + 'px';
      pinElement.querySelector('img').src = adsData[i].author.avatar;
      pinElement.querySelector('img').alt = adsData[i].offer.title;

      fragment.append(pinElement);
    }
    deletePins();
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
  // удаление меток
  var deletePins = function () {
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (item) {
      item.remove();
    });
  };

  window.pin = {
    renderPin: renderPin,
    getCoordinatePin: getCoordinatePin,
    deletePins: deletePins
  };
})();
