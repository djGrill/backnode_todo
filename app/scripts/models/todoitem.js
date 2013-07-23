define(['backbone'], function(Backbone) {
    var TodoItem = Backbone.Model.extend({
        urlRoot: '/todos',

        defaults: {
            status: 'incomplete',
            active: true
        },

        toggleStatus: function() {
            if (this.get('status') == 'incomplete')
                this.set({'status': 'complete'});
            else
                this.set({'status': 'incomplete'});
            this.save();
        }
    });

    return TodoItem;
});
