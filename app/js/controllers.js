"use strict";


var todoControllers = angular.module('todoControllers', ["todoServices"]);


todoControllers.controller('ListCtrl', function ($scope, $location, TodoApi, TodoState) {
    $scope.todos = TodoState.getAll;
    $scope.reset = function reset() {
        TodoApi.getAll().then(function (data) {
            TodoState.reset(data);
            $scope.$apply();
        });
    };
    $scope.selectTodo = TodoState.select.bind(TodoState);
    $scope.add = TodoState.select.bind(TodoState, {}, true);
});
todoControllers.controller('ItemCtrl', function ($scope, $location, TodoState, TodoApi) {
    function cancel(){
        $location.path("/#/todos");
        TodoState.select(null);
    }
    $scope.todo = TodoState.current();
    $scope.isNew = TodoState.isNew;
    $scope.cancel = cancel;
    $scope.save = function () {
        TodoApi.update($scope.todo).then(function () {
            TodoState.update($scope.todo);
            cancel();
            $scope.$apply();
        });
    };
    $scope.remove = function (){
        var title = $scope.todo.title;
        TodoApi.del(title).then(function () {
            TodoState.remove(title);
            cancel();
            $scope.$apply();
        });
    }
});