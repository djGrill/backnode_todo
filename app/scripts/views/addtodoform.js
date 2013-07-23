define(['backbone', 'underscore', 'models/todoitem'], function(Backbone, _, TodoItem) {
    var AddTodoForm = Backbone.View.extend({
        template: _.template('<form>' +
            '<input type="text" name="name" />' +
            '<input type="submit" value="Create task" />' +
            '</form>'
        ),

        render: function() {
            this.$el.html(this.template());
            return this;
        },

        events: {
            submit: 'save'
        },

        save: function(e) {
            e.preventDefault();
            var name = this.$('input[name=name]').val();

            if (this.isValid()) {
                var todoItem = new TodoItem({name: name});
                todoItem.save();
                this.model.fetch();

                this.$('input[name=name]').val('');
            }
        },

        isValid: function() {
            var name = this.$('input[name=name]').val();

            if (name.length === 0)
                return false;

            return true;
        }
    });

    return AddTodoForm;
});
