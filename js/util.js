'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  // выбор рандомного элемента из массива
  var getRandomStat = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };
  // выбор рандомной длины массива
  var getRandomLengthArr = function (arr) {
    var start = Math.floor(Math.random() * arr.length);
    var end = (Math.floor(Math.random() * (arr.length - start) + 1) + start);
    return arr.slice(start, end);
  };
  // таймаут
  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    LEFT_MOUSE_BUTTON_KEY: 1,
    ENTER_KEY: 'Enter',
    ESC_KEY: 'Escape',
    getRandomStat: getRandomStat,
    getRandomLengthArr: getRandomLengthArr,
    debounce: debounce
  };
})();
