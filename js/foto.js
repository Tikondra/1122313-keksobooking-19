'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_SIZE = 70;
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var avatarChooser = document.querySelector('.ad-form-header__input');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var photoAdChooser = document.querySelector('.ad-form__input');
  var photoAdBox = document.querySelector('.ad-form__photo');

  var resetPhoto = function () {
    var activePhoto = photoAdBox.querySelector('img');
    if (activePhoto) {
      activePhoto.remove();
    }
  };
  var resetAllPhoto = function () {
    resetPhoto();
    previewAvatar.src = DEFAULT_AVATAR;
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
    previewAdPhoto.width = PHOTO_SIZE;
    previewAdPhoto.height = PHOTO_SIZE;
    photoAdBox.append(previewAdPhoto);
    loadImg(evt, previewAdPhoto);
  };
  avatarChooser.addEventListener('change', onLoadAvatar);
  photoAdChooser.addEventListener('change', onLoadPhoto);

  window.foto = {
    resetPhoto: resetAllPhoto
  };
})();
