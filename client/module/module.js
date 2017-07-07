Template.module.events({

    'click .delete': function() {

        // Add
        Meteor.call('deleteModule', this._id);
    },
    'click .module-up': function() {

        Meteor.call('changeModuleOrder', this._id, -1);

    },
    'click .module-down': function() {

        Meteor.call('changeModuleOrder', this._id, 1);

    }

});
