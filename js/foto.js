'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO__SIZE = 70;
  var DEFAULT__AVATAR = 'img/muffin-grey.svg';
  var avatarChooser = document.querySelector('.ad-form-header__input');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var photoAdChooser = document.querySelector('.ad-form__input');
  var photoAdBox = document.querySelector('.ad-form__photo');

  var resetPhoto = function () {
    var activePhoto = photoAdBox.querySelector('img');
    if (activePhoto) {
      activePhoto.remove();
    }
    previewAvatar.src = DEFAULT__AVATAR;
  };
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
  var onLoadPhoto = function (evt) {
    resetPhoto();
    var previewAdPhoto = document.createElement('img');
    previewAdPhoto.width = PHOTO__SIZE;
    previewAdPhoto.height = PHOTO__SIZE;
    photoAdBox.append(previewAdPhoto);
    loadImg(evt, previewAdPhoto);
  };
  avatarChooser.addEventListener('change', onLoadAvatar);
  photoAdChooser.addEventListener('change', onLoadPhoto);

  window.foto = {
    resetPhoto: resetPhoto
  };
})();
