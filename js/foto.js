'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var FOTO__SIZE = 70;
  var avatarChooser = document.querySelector('.ad-form-header__input');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var fotoAdChooser = document.querySelector('.ad-form__input');
  var fotoAdBox = document.querySelector('.ad-form__photo');

  var loadImg = function (evt, preview) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };
  var onLoadAvatar = function (evt) {
    loadImg(evt, previewAvatar);
  };
  var onLoadFoto = function (evt) {
    var activeFoto = fotoAdBox.querySelector('img');
    if (activeFoto) {
      activeFoto.remove();
    }
    var previewAdFoto = document.createElement('img');
    previewAdFoto.width = FOTO__SIZE;
    previewAdFoto.height = FOTO__SIZE;
    fotoAdBox.append(previewAdFoto);
    loadImg(evt, previewAdFoto);
  };
  avatarChooser.addEventListener('change', onLoadAvatar);
  fotoAdChooser.addEventListener('change', onLoadFoto);
})();
