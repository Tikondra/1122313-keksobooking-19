'use strict';

(function () {
  var filter = document.querySelector('.map__filters');
  var selectType = filter.querySelector('select[name=housing-type]');
  var adds = [];
  var type = 'any'; // любой тип

  // отрисовка меток и карт
  var render = function (data) {
    window.pin.renderPin(data);
    window.card.getPins(data);
  };
  // загрузка данных
  var loadAdds = function (data) {
    adds = data;
    render(data);
  };
  // фильтрация
  var updatePins = function () {
    if (type === 'any') {
      render(adds);
    } else {
      var sameTypeAdds = adds.filter(function (it) {
        return it.offer.type === type;
      });
      render(sameTypeAdds);
    }
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
