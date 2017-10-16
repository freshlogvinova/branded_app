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

     $scope.selections = {};

     $scope.test = function(item) {
       window.console.error($scope.selections.selected);
       $scope.uploader = new FileUploader({
         url: '/upload',
         formData:  [{
           select:  JSON.stringify($scope.selections)
         }]
       });
     };

    });

 
