app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  var index = {
    cache: false,
    url: '/',
    templateUrl: 'tacos',
    controller: 'TacosCtrl'
  };

  $stateProvider
    .state('index', index)
}]);
