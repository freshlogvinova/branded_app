angular.module('App')
    .controller("fileController", function ($scope, $http, FileUploader) {

      $http.get('/:some')
          .success(function (data, status) {
            console.log(data, "PAGE SOME");
            $scope.dataPage = data;
          })
          .error(function (data, status) {
            console.log(data);
          });


      // $http.get('/get_all_items')
      //     .success(function (data, status) {
      //       console.log(data);
      //       $scope.items = data;
      //     })
      //     .error(function (data, status) {
      //       console.log(data);
      //     });
      //
      // $http.get('/get_pages')
      //     .success(function (data, status) {
      //       console.log(data);
      //       $scope.pages = data;
      //     })
      //     .error(function (data, status) {
      //       console.log(data);
      //     });

      $scope.delete = function (item) {
        if (confirm("Are you sure?")) {
          const index = $scope.items.indexOf(item);
          $http.delete('/remove_video/' + item.id)
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

      $scope.data = {
        pages: $scope.pages,
        selected: null
      };

      $scope.fileObject = [];

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

 
