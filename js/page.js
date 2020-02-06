'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var filter = map.querySelector('.map__filters-container');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var address = adForm.querySelector('input[name=address]');
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
    if (evt.which === window.util.LEFT_MOUSE_BUTTON_KEY) {
      activationPage();
    }
  };
  var onActivationPageEnt = function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      activationPage();
    }
  };
  var activationPage = function () {
    deactivateInputs(false);
    map.classList.remove('map--faded');
    address.value = getCoordinatePin();
    // отрисовка меток
    window.pin.renderPin();
    window.card.getPins();
    mainPin.removeEventListener('mousedown', onActivationPage);
    mainPin.removeEventListener('keydown', onActivationPageEnt);
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

  // деактивация инпутов
  deactivateInputs(true);
  // начальное значение адресса
  address.value = getCoordinatePin();
  // активация страницы
  mainPin.addEventListener('mousedown', onActivationPage);
  mainPin.addEventListener('keydown', onActivationPageEnt);
})();
