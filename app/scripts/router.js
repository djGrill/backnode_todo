define(['backbone', 'models/todoitem', 'collections/todoitems', 'views/todoitemsview', 'views/addtodoform'], function(Backbone, TodoItem, TodoItems, TodoItemsView, AddTodoForm) {
    var App = new (Backbone.Router.extend({
        routes: {
            '': 'index',
            'todos/:id': 'show'
        },

        initialize: function() {
            this.todoItems = new TodoItems();
            this.todoItemsView = new TodoItemsView({collection: this.todoItems});
            this.addTodoForm = new AddTodoForm({model: this.todoItems});
            this.addTodoForm.render();
            this.todoItemsView.render();
        },

        start: function() {
            Backbone.history.start({pushState: true});
        },

        index: function() {
            $('body').append(this.addTodoForm.el);
            $('body').append(this.todoItemsView.el);
            this.todoItems.fetch();
        },

        show: function(id) {
            this.todoItems.focusOnTodoItem(id);
        }
    }));

    return App;
});
