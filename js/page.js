'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var filter = map.querySelector('.map__filters-container');
  var adForm = document.querySelector('.ad-form');
  var address = adForm.querySelector('input[name=address]');
  // деактивация инпутов
  var deactivateFilterInputs = function (state) {
    var mapFilterForm = filter.querySelector('.map__filters');
    var mapFilters = mapFilterForm.querySelectorAll('.map__filter');
    var mapCheckboxFieldset = mapFilterForm.querySelector('.map__features');
    if (state === true) {
      mapFilterForm.classList.add('map__filters--disabled');
    } else {
      mapFilterForm.classList.remove('map__filters--disabled');
    }
    mapFilters.forEach(function (item) {
      item.disabled = state;
    });
    mapCheckboxFieldset.disabled = state;
  };
  var deactivateFormInputs = function (state) {
    var formAvatarInput = adForm.querySelector('.ad-form-header__input');
    var adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
    if (state === true) {
      adForm.classList.add('ad-form--disabled');
    } else {
      adForm.classList.remove('ad-form--disabled');
    }
    adFormFieldsets.forEach(function (item) {
      item.disabled = state;
    });
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
    deactivateFormInputs(false);
    deactivateFilterInputs(false);
    map.classList.remove('map--faded');
    address.value = window.pin.getCoordinatePin();
    // загрузка данных, отрисовка меток, и навешивание обработчиков на них
    window.load.load(window.filter.loadAdds, window.load.onError, window.card.getPins);
    mainPin.removeEventListener('mousedown', onActivationPage);
    mainPin.removeEventListener('keydown', onActivationPageEnt);
  };
  // деактивация страницы
  var deactivationPage = function () {
    map.classList.add('map--faded');
    // деактивация инпутов
    deactivateFormInputs(true);
    deactivateFilterInputs(true);
    // удаление меток
    window.pin.deletePins();
    // удаление карточки
    window.card.deleteCard();
    adForm.reset();
    // начальное значение адресса
    address.value = window.pin.getCoordinatePin();
    // активация страницы
    mainPin.addEventListener('mousedown', onActivationPage);
    mainPin.addEventListener('keydown', onActivationPageEnt);
  };

  deactivationPage();

  window.page = {
    deactivationPage: deactivationPage,
    deactivateFilterInputs: deactivateFilterInputs
  };
})();
