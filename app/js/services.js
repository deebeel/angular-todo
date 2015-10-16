"use strict";

var todoServices = angular.module('todoServices', []);
var data = [
    {
        title: "title1",
        done: true,
        description: "sometext"
    }
];

function filterPredicate(title) {
    return function (todo) {
        return todo.title !== title
    };
}


todoServices.factory("TodoApi", function () {

    return {
        getAll: function () {
            return new Promise(function (resolve) {
                setTimeout(resolve.bind(this, data), 1000);
            });
        },

        del: function (title) {
            return new Promise(function (resolve) {
                data = data.filter(filterPredicate(title));
                setTimeout(resolve, 1000);
            });
        },
        update: function (item) {
            return new Promise(function (resolve) {
                data = data.filter(filterPredicate(item.title));
                data.push(item);
                setTimeout(resolve, 1000);
            });
        },
        add: function (item) {
            return new Promise(function (resolve) {
                data.push(item);
                setTimeout(resolve, 1000);
            });
        }
    }
});
todoServices.service("TodoState", function () {
    var todos = [];
    var current = null;
    return {
        getAll: function () {
            return todos
        },
        current: function () {
            return current;
        },
        select: function (todo) {
            current = todo;
        },
        reset: function (data, curr) {
            todos = data;
            current = curr;
        },
        add: function (todo) {
            todos.push(todo);
        },
        remove: function (title) {
            todos = todos.filter(title);
        },
        update: function (todo) {
            this.remove(todo.title);
            this.add(todo);
        }
    }
});