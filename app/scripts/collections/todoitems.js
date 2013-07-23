define(['backbone', 'models/todoitem'], function(Backbone, TodoItem) {
    var TodoItems = Backbone.Collection.extend({
        model: TodoItem,
        url: '/todos',

        initialize: function() {
            this.on('remove', this.hideModel, this);
        }
    });

    return TodoItems;
});
