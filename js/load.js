'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL__SAVE = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var STATUS__OK = 200;
  var templateError = document.querySelector('#error')
    .content
    .querySelector('.error');
  var load = function (onLoad, onError, getPins) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS__OK) {
        onLoad(xhr.response);
        getPins();
      } else {
        onError('Статус ответа: ' + xhr.status + '' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;
    xhr.open('GET', URL);
    xhr.send();
  };
  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS__OK) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка загрузки объявления');
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;
    xhr.open('POST', URL__SAVE);
    xhr.send(data);
  };
  var onError = function (errorMessage) {
    var error = templateError.cloneNode(true);
    var onHideErrorEsc = function (evt) {
      if (evt.key === window.util.ESC_KEY) {
        onHideError();
      }
    };
    var onHideError = function () {
      error.remove();
      document.removeEventListener('keydown', onHideErrorEsc);
      document.removeEventListener('click', onHideError);
    };
    error.querySelector('.error__message').textContent = errorMessage;
    document.addEventListener('keydown', onHideErrorEsc);
    document.addEventListener('click', onHideError);
    document.querySelector('main')
      .append(error);
    window.page.deactivateFilterInputs(true);
  };

  window.load = {
    load: load,
    save: save,
    onError: onError
  };
})();
