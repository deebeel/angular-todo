"use strict";


var todoControllers = angular.module('todoControllers', ["todoServices"]);


todoControllers.controller('ListCtrl', function ($scope, TodoApi, TodoState) {
    $scope.reset = function reset() {
        TodoApi.getAll().then(function (data) {
            TodoState.reset(data);
            $scope.data = {
                todos: TodoState.getAll()
            };
            $scope.$digest();
        })
    };
    $scope.selectTodo = function (index) {
        TodoState.select(TodoState.getAll()[index]);
    }
});
todoControllers.controller('ItemCtrl', function ($scope, Todo) {

});