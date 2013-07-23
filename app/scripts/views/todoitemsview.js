define(['backbone', 'underscore', 'views/todoview'], function(Backbone, _, TodoView) {
    var TodoListView = Backbone.View.extend({
        tagName: 'ul',
        id: 'todos',

        initialize: function() {
            this.collection.on('add', this.renderTodoItem, this);
            this.collection.on('reset', this.reset, this);
        },

        render: function() {
            this.collection.forEach(this.renderTodoItem, this);
            return this;
        },

        renderTodoItem: function(todoItem) {
            var todoView = new TodoView({model: todoItem});
            this.$el.append(todoView.render().el);
        },

        reset: function() {
            this.$el.empty();
            this.collection.forEach(this.renderTodoItem, this);
        },

        hideItem: function(model) {
            model.trigger('hide');
        }
    });

    return TodoListView;
});
