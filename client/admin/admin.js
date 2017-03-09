Template.admin.onRendered(function() {

    // // Get all users
    // Meteor.call('getUsersEmails', function(err, users) {

    //     Session.set('users', users);

    //     $("#user-id").autocomplete({
    //         source: users
    //     });

    // });
});

Template.admin.events({

    'click #add-integration': function() {

        var accountData = {
            type: $('#integration-type :selected').val(),
            key: $('#integration-key').val(),
            url: $('#integration-url').val(),
            userId: Meteor.user()._id
        };
        Meteor.call('addIntegration', accountData);

    },

    'click #generate-key': function() {

        Meteor.call('generateApiKey');

    },
    'click #set-role': function() {

        Meteor.call('setUserRole', $('#user-id :selected').val(), $('#user-role :selected').val());

    },
    'click #set-course-owner': function() {

        Meteor.call('setCourseOwner', $('#course-user-id :selected').val(), $('#course-id :selected').val());

    },
    'click #assign-teacher': function() {

        Meteor.call('assignTeacher', $('#app-user-id :selected').val(), $('#student-id :selected').val());

    }
});

Template.admin.helpers({
    key: function() {
        return Meteor.user().apiKey;
    },
    users: function() {
        return Meteor.users.find({});
    },
    appUsers: function() {
        return Meteor.users.find({ role: { $in: ['admin', 'appuser'] } });
    },
    students: function() {
        return Meteor.users.find({ role: 'student' });
    },
    courses: function() {
        return Courses.find({});
    },
    integrations: function() {
        return Integrations.find({});
    }
});
