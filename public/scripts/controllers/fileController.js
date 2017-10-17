angular.module('App')
    .controller("fileController", function ($scope, $http, FileUploader) {

        $http.get('/get_all_items')
            .success(function (data, status) {
                console.log(data);
                $scope.items = data;
            })
            .error(function (data, status) {
                console.log(data);
            });

        $http.get('/get_pages')
            .success(function (data, status) {
                console.log(data);
                $scope.pages = data;
            })
            .error(function (data, status) {
                console.log(data);
            });

        $scope.data = {
            pages: $scope.pages,
            selected: null
        };

        $scope.fileObject = [];

        $scope.uploader = new FileUploader({
            url: '/upload',
            onAfterAddingFile: function (item) {
                $scope.fileObject.push({file: item.file.name, message:"Don't upload yet", progress:0});
            },
            onBeforeUploadItem: function (item) {
                item.formData = [{
                    select: $scope.data.selected.id
                }];
            },
            onProgressItem: function (item, progress) {
                $scope.fileObject.forEach(function (items, i, arr) {
                    if(items.file === item.file.name) {
                        items.progress = progress;
                    }});
            },
            onCompleteItem: function (item, response, status, headers) {
                $scope.fileObject.forEach(function (items, i, arr) {
                    if (items.file === item.file.name) {
                        items.message = response;
                    }
                });
            }
        });

    });

 
