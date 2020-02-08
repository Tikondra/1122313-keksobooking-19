'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT = 10000;
  var STATUS__OK = 200;
  var load = function (onLoad, onError, getPins) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS__OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + '' + xhr.statusText);
      }
      getPins();
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

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load = {
    load: load,
    onError: onError
  };
})();
