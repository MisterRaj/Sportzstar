'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'Articles',
  'Registration',
  'Login',
  'ngTable'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider
  	.when('/list-article', {
    	templateUrl: 'article/list-articles.html',
    	controller: 'listArticle'
  })
  	.when('/add-article', {
    	templateUrl: 'article/add-article.html',
    	controller: 'createArticle'
  })
    .when('/edit-article/:id', {
      templateUrl: 'article/edit-article.html',
      controller: 'editArticle'
  })
    .when('/login', {
      templateUrl: 'login/login.html',
  })
    .when('/registration', {
      templateUrl: 'login/registration.html',
      controller: 'addUser'
  })
	.otherwise({redirectTo: '/view1'});
}]);