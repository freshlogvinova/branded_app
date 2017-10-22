angular.module('App')
    .controller("fileController", function ($scope, $http, FileUploader) {

        $http.get('/get_pages')
            .success(function (data, status) {
                console.log(data, "PAGES");
                $scope.pages = data;
            })
            .error(function (data, status) {
                console.log(data);
            });

        $http.get('/get_all_items')
            .success(function (data, status) {
                console.log(data, "ITEMS");
                $scope.items = data;
            })
            .error(function (data, status) {
                console.log(data);
            });

        $scope.newPage = {
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

        $scope.data = {
            pages: $scope.pages,
            selected: null
        };

        $scope.dataChange = {
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
            hue: false,
            saturation: true,
            lightness: false, // Note: In the square mode this is HSV and in round mode this is HSL
            alpha: false,
            dynamicHue: false,
            dynamicSaturation: false,
            dynamicLightness: false,
            dynamicAlpha: false,
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
        $scope.create = function () {
            console.log($scope.newPage);
        };

        $scope.uploader = new FileUploader({
            url: '/upload',
            onAfterAddingFile: function (item) {
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

 
