'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'addArticles'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

    $routeProvider
	  .when('/add-article', {
	  	templateUrl: 'article/add-article.html',
	  	controller: 'createArticle'
	  })
		.otherwise({redirectTo: '/view1'});
}]);
