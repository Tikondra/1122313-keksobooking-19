'use strict';

(function () {
  var filter = document.querySelector('.map__filters');
  var selectType = filter.querySelector('select[name=housing-type]');
  var adds = [];
  var type = 'any'; // любой тип

  // загрузка данных
  var loadAdds = function (data) {
    adds = data;
    window.pin.renderPin(data);
  };
  // фильтрация
  var updatePins = function () {
    if (type === 'any') {
      window.pin.renderPin(adds);
    } else {
      var sameTypeAdds = adds.filter(function (it) {
        return it.offer.type === type;
      });
      window.pin.renderPin(sameTypeAdds);
    }
    window.card.getPins();
  };
  var onSelectType = function () {
    type = selectType.value;
    window.card.deleteCard();
    updatePins();
  };
  selectType.addEventListener('change', onSelectType);

  window.filter = {
    loadAdds: loadAdds
  };
})();
