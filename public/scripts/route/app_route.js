angular.module('App')
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
          .when("/", {
            templateUrl: "/views/body/tchop.html"
          })
          .when("/test", {
            templateUrl: "/views/body/admin-test.html"
          })
          .when("/admin", {
            templateUrl: "/views/body/admin.html"
          })
          .when("/tchop", {
            templateUrl: "/views/body/tchop.html"
          })
          .when("/bvg", {
            templateUrl: "/views/body/bvg.html"
          })
          .when("/group", {
            templateUrl: "/views/body/group.html"
          })
          .when("/opel", {
            templateUrl: "/views/body/opel.html"
          })
          .when("/unicef", {
            templateUrl: "/views/body/unicef.html"
          })
          .when("/wernsing", {
            templateUrl: "/views/body/wernsing.html"
          })
      }]);