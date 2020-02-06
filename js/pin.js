'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
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

  window.pin = {
    renderPin: renderPin
  };
})();
