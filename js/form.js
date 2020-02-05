'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var guestsSelect = adForm.querySelector('select[name=capacity]');
  var typeOfHousing = adForm.querySelector('select[name=type]');
  var pricePerNight = adForm.querySelector('input[name=price]');
  var timeIn = adForm.querySelector('select[name=timein');
  var timeOut = adForm.querySelector('select[name=timeout');

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
  // установка минимальной цены
  var getMinPrice = function () {
    var type = typeOfHousing.value;
    if (type === 'bungalo') {
      pricePerNight.setAttribute('min', '0');
      pricePerNight.setAttribute('placeholder', '0');
    } else if (type === 'flat') {
      pricePerNight.setAttribute('min', '1000');
      pricePerNight.setAttribute('placeholder', '1000');
    } else if (type === 'house') {
      pricePerNight.setAttribute('min', '5000');
      pricePerNight.setAttribute('placeholder', '5000');
    } else if (type === 'palace') {
      pricePerNight.setAttribute('min', '10000');
      pricePerNight.setAttribute('placeholder', '10000');
    }
  };
  // соотношение заезда и выезда
  var getTimeRatio = function () {
    var timeOutOptions = timeOut.querySelectorAll('option');
    var timeInOptions = timeIn.querySelectorAll('option');

    var onChangeTimeIn = function () {
      timeInOptions.forEach(function (item, index) {
        if (item.selected === true) {
          timeOutOptions[index].selected = true;
        }
      });
    };
    var onChangeTimeOut = function () {
      timeOutOptions.forEach(function (item, index) {
        if (item.selected === true) {
          timeInOptions[index].selected = true;
        }
      });
    };
    timeIn.addEventListener('change', onChangeTimeIn);
    timeOut.addEventListener('change', onChangeTimeOut);
  };
  // валидация формы
  var onValidationForm = function () {
    // проверка соотношения комнат к гостям
    roomsAndGuestsValidation();
    // проверка минимальной цены
    getMinPrice();
    // соотношение заезда и выезда
    getTimeRatio();
  };

  // валидация формы
  adForm.addEventListener('input', onValidationForm);
})();
