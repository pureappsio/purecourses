Template.admin.onRendered(function() {

    // $('#user-id').selectpicker();
    // $('#student-id').selectpicker();
    // $('#course-id').selectpicker();

    // if (this.data) {
    //     $('#user-id').selectpicker('refresh');
    //     $('#student-id').selectpicker('refresh');
    //     $('#course-id').selectpicker('refresh');
    // }

    // Get all users
    Meteor.call('getAllUsers', function(err, users) {
        console.log(users);

        Session.set('users', users);

        // Fill users
        for (i = 0; i < users.length; i++) {
            $('#users').append($('<option>', {
                value: users[i]._id,
                text: users[i].emails[0].address
            }));
        }
    });
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

        Meteor.call('setUserRole', $('#user-id').val(), $('#user-role :selected').val());

    },
    'click #set-course-owner': function() {

        Meteor.call('setCourseOwner', $('#course-user-id :selected').val(), $('#course-id').val());

    },
    'click #assign-teacher': function() {

        Meteor.call('assignTeacher', $('#app-user-id :selected').val(), $('#student-id').val());

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
