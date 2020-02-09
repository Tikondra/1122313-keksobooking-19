'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var address = adForm.querySelector('input[name=address]');
  var guestsSelect = adForm.querySelector('select[name=capacity]');
  var typeOfHousing = adForm.querySelector('select[name=type]').value;
  var pricePerNight = adForm.querySelector('input[name=price]');
  var timeIn = adForm.querySelector('select[name=timein');
  var timeOut = adForm.querySelector('select[name=timeout');
  var templateSuccess = document.querySelector('#success')
    .content
    .querySelector('.success');
  var resetBtn = adForm.querySelector('.ad-form__reset');

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
  var getMinPrice = function (type) {
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
    getMinPrice(typeOfHousing);
    // соотношение заезда и выезда
    getTimeRatio();
  };
  // сообщение об отправке
  var creatSuccess = function () {
    var success = templateSuccess.cloneNode(true);
    var onHideSuccessEsc = function (evt) {
      if (evt.key === window.util.ESC_KEY) {
        onHideSuccess();
      }
    };
    var onHideSuccess = function () {
      success.remove();
      document.removeEventListener('keydown', onHideSuccessEsc);
      document.removeEventListener('click', onHideSuccess);
    };
    document.addEventListener('keydown', onHideSuccessEsc);
    document.addEventListener('click', onHideSuccess);
    document.body.append(success);
  };
  // отправка формы
  var getPostForm = function () {
    window.page.deactivationPage();
    creatSuccess();
  };

  // валидация формы
  adForm.addEventListener('input', onValidationForm);
  adForm.addEventListener('submit', function (evt) {
    window.load.save(new FormData(adForm), getPostForm, window.load.onError);
    evt.preventDefault();
  });
  resetBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    adForm.reset();
    address.value = window.pin.getCoordinatePin();
  });
})();
