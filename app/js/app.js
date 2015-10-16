"use strict";

var todoApp = angular.module('todoApp', [
    'ngRoute',
    'todoControllers',
    'todoServices'
]);

todoApp.config(function ($routeProvider) {
    $routeProvider.
        when('/todos', {
            templateUrl: 'partials/list.html',
            controller: 'ListCtrl'
        }).
        when('/todos/:id', {
            templateUrl: 'partials/item.html',
            controller: 'ItemCtrl'
        }).
        otherwise({
            redirectTo: '/todos'
        });
});