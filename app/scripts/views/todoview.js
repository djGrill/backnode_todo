define(['jquery', 'backbone', 'underscore'], function($, Backbone, _) {
    var TodoView = Backbone.View.extend({
        tagName: 'li',
        className: 'todo',

        events: {
            'change input.toggle-status': 'toggleStatus',
            'click a.show-edit': 'showEditForm',
            'click input.edit-form-cancel': 'cancelEditForm',
            'click input.edit-form-submit': 'submitEditForm',
            'click a.delete': 'destroy'
        },

        template: _.template(
            '<h3 class="<%= status %>">' +
            '<input type="checkbox" class="toggle-status" ' +
            '<% if(status === "complete") print("checked") %>/>' +
            '<span class="name"><%= name %></span>' +
            '<form class="edit-form hide" data-id="<%= id %>"><input type="text" name="name" value="<%= name %>" /><input type="submit" class="edit-form-submit" value="Save" /><input type="button", class="edit-form-cancel" value="Cancel" /></form>' +
            '</h3>' +
            '<span class="options"><a href class="show-edit">Edit</a><a href class="delete">Delete</a></span>'
        ),

        initialize: function() {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
            this.model.on('hide', this.remove, this);
        },

        render: function() {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },

        showEditForm: function(e) {
            e.preventDefault();
            this.$el.find('.name, .options').hide();
            this.$el.find('.edit-form').removeClass('hide');
        },

        cancelEditForm: function() {
            this.$el.find('.name, .options').show();
            this.$el.find('.edit-form').addClass('hide')
        },

        submitEditForm: function(e) {
            e.preventDefault();
            var name = this.$('input[name=name]').val();
            var id = this.$('.edit-form').data('id');

            if (name.length > 0) {
                this.model.set({name: name});
                this.model.save();

                this.cancelEditForm();
            }
        },

        destroy: function(e) {
            e.preventDefault();
            this.model.destroy();
        },

        remove: function() {
            this.$el.remove();
        },

        toggleStatus: function() {
            this.model.toggleStatus();
        }
    });

    return TodoView;
});
