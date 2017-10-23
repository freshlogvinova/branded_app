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
          link_to: '',
          btn_text: ''
        }
      };


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
        console.log($scope.newPage)
        item.upload();
        // $http.post('/create', item.formData)
        //     .success(function (data, status) {
        //       console.log(data);
        //     })
        //     .error(function (data, status) {
        //       console.log(data);
        //     });
      };
      $scope.uploader = new FileUploader({
        url: '/create',
        formData: [{
          name: $scope.newPage.name
        }]
      });

      // $scope.uploader.onBeforeUploadItem = function(item) {
      //   formData = [{
      //     name: $scope.newPage
      //   }];
      //   Array.prototype.push.apply(item.formData, formData);
      // };
    });

 
