'use strict';

(function () {
  var filter = document.querySelector('.map__filters');
  var selectType = filter.querySelector('#housing-type');
  var selectPrice = filter.querySelector('#housing-price');
  var selectRooms = filter.querySelector('#housing-rooms');
  var selectGuests = filter.querySelector('#housing-guests');
  var featuresList = filter.querySelector('#housing-features');
  var adds = [];
  var defaultValue = 'any'; // любой тип дефолт

  // загрузка данных
  var loadAdds = function (data) {
    adds = data;
    render(data);
  };
  // отрисовка меток и карт
  var render = function (data) {
    window.pin.renderPin(data);
    window.card.getPins(data);
  };
  // фильтр по типу
  var filterPins = function () {
    var sameAdds = adds.filter(function (add) {
      if (selectType.value === defaultValue) {
        return true;
      }
      return add.offer.type === selectType.value;
    }).filter(function (add) {
      var priceLimit = {
        any: add.offer.type,
        middle: add.offer.price >= 10000 && add.offer.price <= 50000,
        low: add.offer.price < 10000,
        high: add.offer.price >= 50000
      };
      return priceLimit[selectPrice.value];
    }).filter(function (add) {
      if (selectRooms.value === defaultValue) {
        return true;
      }
      return add.offer.rooms.toString() === selectRooms.value;
    }).filter(function (add) {
      if (selectGuests.value === defaultValue) {
        return true;
      }
      return add.offer.guests.toString() === selectGuests.value;
    }).filter(function (add) {
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
