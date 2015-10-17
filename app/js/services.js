"use strict";

var todoServices = angular.module('todoServices', []);


function filterPredicate(title) {
    return function (todo) {
        return todo.title !== title
    };
}


todoServices.factory("TodoApi", function () {
    var data = [
        {
            title: "title1",
            done: true,
            description: "sometext"
        }
    ];
    return {
        getAll: function () {
            return new Promise(function (resolve) {
                setTimeout(resolve.bind(this, data), 1000);
            });
        },

        del: function (title) {
            return new Promise(function (resolve) {
                data = data.filter(filterPredicate(title));
                console.log(data);

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
        isNew: false,
        getAll: function () {
            return todos
        },
        current: function () {
            return current;
        },
        select: function (todo, isNew) {
            current = todo;
            this.isNew = !!isNew;
        },
        reset: function (data, curr) {
            todos = data;
            current = curr;
            this.isNew = false;
        },
        add: function (todo) {
            todos.push(todo);
            this.isNew = false;
        },
        remove: function (title) {
            todos = todos.filter(filterPredicate(title));
            this.isNew = false;
        },
        update: function (todo) {
            this.remove(todo.title);
            this.add(todo);
        }
    }
});