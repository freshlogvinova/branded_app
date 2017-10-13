angular.module('App')
    .controller("fileController", function ($scope, $http) {
      $http.get('/get_all_items')
          .success(function (data, status) {
            console.log(data);
            $scope.items = data.rows;
          })
          .error(function (data, status) {
            console.log(data);
          });

      $http.get('/get_pages')
          .success(function (data, status) {
            console.log(data);
            $scope.pages = data.rows;
          })
          .error(function (data, status) {
            console.log(data);
          });

    });

 
