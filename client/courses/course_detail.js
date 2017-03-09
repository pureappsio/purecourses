Template.courseDetails.events({

    'click #add-lesson': function() {

        // Module
        lesson = {
            name: $('#lesson-name').val(),
            url: $('#lesson-url').val(),
            order: parseFloat($('#lesson-order').val()),
            courseId: this._id,
            userId: Meteor.user()._id
        };

        // Add
        Meteor.call('addLesson', lesson);
    },

    'click #add-module': function() {

        // Module
        module = {
            name: $('#module-name').val(),
            order: parseFloat($('#module-order').val()),
            courseId: this._id,
            userId: Meteor.user()._id
        }

        if ($('#products').val() != null) {
            module.products = $('#products').val();
        }

        // Add
        Meteor.call('addModule', module);
    },
    'click #add-bonus': function() {

        // Module
        bonus = {
            name: $('#resource-name').val(),
            url: $('#resource-url').val(),
            type: $('#resource-type :selected').val(),
            courseId: this._id,
            userId: Meteor.user()._id
        };

        // Add
        Meteor.call('addBonus', bonus);
    }

});

Template.courseDetails.helpers({

    modules: function() {
        if (Meteor.user().role == 'admin' || Meteor.user().role == 'appuser') {
            return Modules.find({ courseId: this._id });
        } else {
            return Session.get('allowedModules');
        }
    },
    lessons: function() {
        return Lessons.find({ courseId: this._id });
    },
    bonuses: function() {
        if (Meteor.user().role == 'admin' || Meteor.user().role == 'appuser') {
            return Bonuses.find({ courseId: this._id });
        } else {
            return Session.get('allowedBonuses');
        }
    },
    areBonuses: function() {
        if (Session.get('allowedBonuses')) {
            if (Session.get('allowedBonuses').length > 0) {
                return true;
            }
        }
    }

});

Template.courseDetails.onRendered(function() {

    if (this.data) {

        // Get right modules
        console.log('Getting modules');
        Meteor.call('getAllowedModules', Meteor.user()._id, this.data._id, function(err, modules) {
            Session.set('allowedModules', modules);
        });

        // Get right bonuses
        Meteor.call('getAllowedBonuses', Meteor.user()._id, this.data._id, function(err, bonuses) {
            Session.set('allowedBonuses', bonuses);
        });
    }

});
