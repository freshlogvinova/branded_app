angular.module('App')
    .controller("updateController", function ($scope, $http, FileUploader) {

        $http.get('/get_pages')
            .success(function (data, status) {
                console.log(data, "PAGES");
                $scope.pages = data;
            })
            .error(function (data, status) {
                console.log(data);
            });

        $scope.dataChange = {
            pages: $scope.pages,
            selected: null
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
            horizontal:  true
        };

        $scope.change = function () {
            $http.post('/get_options/' + $scope.dataChange.selected.id)
                .success(function (data, status) {
                    console.log(data, "GET OPTIONS");
                    $scope.dataOld = data[0];
                })
                .error(function (data, status) {
                    console.log(data);
                });
        };

      $scope.uploader = new FileUploader({
        url: '/update',
        onBeforeUploadItem: function (item) {
          item.formData = [{
            select: $scope.dataChange.selected.id
          }];
        }
      })

    });

 
