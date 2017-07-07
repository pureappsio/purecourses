Template.courseDetails.events({

    'click #add-lesson': function() {

        // Module
        lesson = {
            name: $('#lesson-name').val(),
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
            courseId: this._id,
            userId: Meteor.user()._id
        }

        if ($('#products').val() != null) {
            module.products = $('#products').val();
        }

        // Add
        Meteor.call('addModule', module, function(err, data) {
            if (!err) {
                $('#module-added').show();
                $('#module-added').fadeOut(2000);
            }
        });
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
        Meteor.call('addBonus', bonus, function(err, data) {
            if (!err) {
                $('#bonus-added').show();
                $('#bonus-added').fadeOut(2000);
            }
        });
    }

});

Template.courseDetails.helpers({

    modules: function() {
        if (Meteor.user().role == 'admin' || Meteor.user().role == 'appuser') {
            return Modules.find({ courseId: this._id }, { sort: { order: 1 } });
        } else if (Meteor.user().modules) {

            if (Meteor.user().modules[this._id]) {
                return Modules.find({ courseId: this._id, _id: { $in: Meteor.user().modules[this._id] } }, { sort: { order: 1 } });
            } else {
                return Modules.find({ courseId: this._id }, { sort: { order: 1 } });
            }
        } else {
            return Modules.find({ courseId: this._id }, { sort: { order: 1 } });
        }
    },
    lessons: function() {
        return Lessons.find({ courseId: this._id });
    },
    bonuses: function() {
        if (Meteor.user().role == 'admin' || Meteor.user().role == 'appuser') {
            return Bonuses.find({ courseId: this._id });
        } else if (Meteor.user().bonuses) {

            if (Meteor.user().bonuses[this._id]) {
                return Bonuses.find({ courseId: this._id, _id: { $in: Meteor.user().bonuses[this._id] } });
            } else {
                return Bonuses.find({ courseId: this._id });
            }
        } else {
            return Bonuses.find({ courseId: this._id });
        }
    },
    areBonuses: function() {
        if (Bonuses.findOne({ courseId: this._id })) {
            return true;
        }
    }

});

Template.courseDetails.onRendered(function() {

    // if (this.data) {

    //     // Get right modules
    //     console.log('Getting modules');
    //     Meteor.call('getAllowedModules', Meteor.user()._id, this.data._id, function(err, modules) {
    //         Session.set('allowedModules', modules);
    //     });

    //     // Get right bonuses
    //     Meteor.call('getAllowedBonuses', Meteor.user()._id, this.data._id, function(err, bonuses) {
    //         Session.set('allowedBonuses', bonuses);
    //     });
    // }

});
