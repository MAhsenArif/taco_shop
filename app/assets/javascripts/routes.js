app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  var index = {
    cache: false,
    url: '/',
    templateUrl: 'pages',
    controller: 'TacosCtrl'
  };

  $stateProvider
    .state('index', index)
}]);
