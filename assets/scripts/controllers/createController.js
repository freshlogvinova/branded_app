angular.module('App')
    .controller("createController", function ($scope, $http, FileUploader) {

      $scope.newPage = {
        nameInit: '',
        name: '',
        logo: '',
        styles: {
          bck_color: '',
          text_color: '',
          btn_color: '',
          btn_bck_color: ''
        },
        content: {
          title: '',
          list: '',
          link_to: 'tchop.io',
          btn_text: ''
        }
      };

      $scope.now = Date.now();

      $scope.options = {
        // html attributes
        required: true,
        disabled: false,
        placeholder: '',
        inputClass: '',
        allowEmpty: false,
        // color
        format: 'hexString',
        case: 'lower',
        // sliders
        hue: true,
        saturation: true,
        lightness: true, // Note: In the square mode this is HSV and in round mode this is HSL
        alpha: true,
        dynamicHue: true,
        dynamicSaturation: true,
        dynamicLightness: true,
        dynamicAlpha: true,
        // swatch
        swatch: true,
        swatchPos: 'left',
        swatchBootstrap: true,
        swatchOnly: false,
        // popup
        round: true,
        pos: 'bottom left',
        inline: false,
        horizontal: true
      };

      $scope.createNew = function (item) {

        if (item) {
          $scope.newPage.logo = $scope.now + '_' + item.file.name;
          item.upload();
        }

        $scope.newPage.name =  $scope.newPage.name.replace(' ', '_');
        $http.post('/create', $scope.newPage)
            .success(function (data, status) {
              console.log(data);
              $scope.pageCreate = data;
              $scope.newPage = null;
            })
            .error(function (data, status) {
              console.log(data);
            });
      };

      $scope.uploader = new FileUploader({
        url: '/upload-image',
        onBeforeUploadItem: function(item) {
          item.file.name =  $scope.newPage.logo;
        }
      });
   });

 
