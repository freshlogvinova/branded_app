angular.module('App')
    .controller("fileController", function ($scope, $http, FileUploader) {

        $http.get('/get_pages')
            .success(function (data, status) {
                console.log(data);
                $scope.pages = data;
            })
            .error(function (data, status) {
                console.log(data);
            });

        $http.get('/get_all_items')
            .success(function (data, status) {
                console.log(data);
                $scope.items = data;
            })
            .error(function (data, status) {
                console.log(data);
            });

        $scope.data = {
            pages: $scope.pages,
            selected: null
        };

        $scope.fileObject = [];

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

        $scope.now = Date.now();

        $scope.delete = function (item) {
            if (confirm("Are you sure?")) {
                const index = $scope.items.indexOf(item);
                $http.delete('/remove_video/' + item.id_items)
                    .success(function (data, status) {
                        console.log(data);
                    })
                    .error(function (data, status) {
                        console.log(data);
                    });
                $scope.items.splice(index, 1);
            }
            else {
                return false
            }
        };

      $scope.uploader = new FileUploader({
            url: '/upload-video',
            onAfterAddingFile: function (item) {
                item.file.name = $scope.now + '_' + item.file.name;
                $scope.fileObject.push({file: item.file.name, message: "Don't upload yet", progress: 0});
            },
            onBeforeUploadItem: function (item) {
                item.formData = [{
                    select: $scope.data.selected.id
                }];
            },
            onProgressItem: function (item, progress) {
                $scope.fileObject.forEach(function (items, i, arr) {
                    if (items.file === item.file.name) {
                        items.progress = progress;
                    }
                });
            },
            onCompleteItem: function (item, response, status, headers) {
                $scope.fileObject.forEach(function (items, i, arr) {
                    if (items.file === item.file.name) {
                        items.message = response;
                    }
                });

                $http.get('/get_all_items')
                    .success(function (data, status) {
                        $scope.items = data;
                    })
            }
        });

    });

 
