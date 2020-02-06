'use strict';

(function () {
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

  window.util = {
    LEFT_MOUSE_BUTTON_KEY: 1,
    ENTER_KEY: 'Enter',
    ESC_KEY: 'Escape',
    getRandomStat: getRandomStat,
    getRandomLengthArr: getRandomLengthArr
  };
})();
