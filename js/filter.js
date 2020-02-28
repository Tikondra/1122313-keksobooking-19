'use strict';

(function () {
  var MAX_PRICE = 50000;
  var MIN_PRICE = 10000;
  var filter = document.querySelector('.map__filters');
  var selectType = filter.querySelector('#housing-type');
  var selectPrice = filter.querySelector('#housing-price');
  var selectRooms = filter.querySelector('#housing-rooms');
  var selectGuests = filter.querySelector('#housing-guests');
  var featuresList = filter.querySelector('#housing-features');
  var ads = [];
  var defaultValue = 'any'; // любой тип дефолт

  // загрузка данных
  var loadAdds = function (data) {
    ads = data;
    render(data);
  };
  // отрисовка меток и карт
  var render = function (data) {
    window.pin.renderPin(data);
    window.card.getPins(data);
  };
  // фильтр
  var filterPins = function () {
    var sameAdds = ads.filter(function (add) { // сортировка по типу
      if (selectType.value === defaultValue) {
        return true;
      }
      return add.offer.type === selectType.value;
    }).filter(function (add) { // сортировка по цене
      var priceLimit = {
        any: add.offer.type,
        middle: add.offer.price >= MIN_PRICE && add.offer.price <= MAX_PRICE,
        low: add.offer.price < MIN_PRICE,
        high: add.offer.price >= MAX_PRICE
      };
      return priceLimit[selectPrice.value];
    }).filter(function (add) { // сортировка по кличеству комнат
      if (selectRooms.value === defaultValue) {
        return true;
      }
      return add.offer.rooms.toString() === selectRooms.value;
    }).filter(function (add) { // сорировка по количеству гостей
      if (selectGuests.value === defaultValue) {
        return true;
      }
      return add.offer.guests.toString() === selectGuests.value;
    }).filter(function (add) { // сортировка по доступным опциям
      var checkFeatures = featuresList.querySelectorAll('input:checked');
      var checkValuesList = [];
      checkFeatures.forEach(function (input) {
        checkValuesList.push(input.value);
      });
      if (checkValuesList.length <= 0) {
        return true;
      }
      var sameFeatures = add.offer.features.filter(function (item) {
        return checkValuesList.includes(item);
      });
      return sameFeatures.length >= checkValuesList.length;
    });
    window.card.deleteCard();
    render(sameAdds);
  };

  filter.addEventListener('change', window.util.debounce(filterPins));

  window.filter = {
    loadAdds: loadAdds
  };
})();
