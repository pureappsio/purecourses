Template.settings.events({

    'click #set-theme': function() {

        // Insert
        Meteor.call('insertMeta', {
            value: $('#theme :selected').val(),
            type: 'theme',
            userId: Meteor.user()._id
        });

    },

    'click #create-student-account': function() {

        var account = {
            email: $('#student-email').val(),
            password: $('#student-password').val(),
            role: 'student',
            teacherId: Meteor.user()._id
        }

        Meteor.call('createStudentAccount', account);

    },
    'click #set-title': function() {

        // Insert
        Meteor.call('insertMeta', {
            value: $('#new-title').val(),
            type: 'title',
            userId: Meteor.user()._id
        });

    },
    'click #set-icon': function() {

        // Reset
        Meteor.call('insertMeta', {
            value: $('#new-icon').val(),
            type: 'icon',
            userId: Meteor.user()._id
        });

    },
    'click #set-user-data': function() {

        // Insert
        Meteor.call('insertMeta', {
            value: $('#user-name').val(),
            type: 'userName',
            userId: Meteor.user()._id
        });

        // Insert
        Meteor.call('insertMeta', {
            value: $('#user-email').val(),
            type: 'userEmail',
            userId: Meteor.user()._id
        });

    },
    'click #set-courses-line': function() {

        // Insert
        Meteor.call('insertMeta', {
            value: $('#courses-line :selected').val(),
            type: 'coursesLine',
            userId: Meteor.user()._id
        });

    },
    'click #set-unlock': function() {

        // Insert
        Meteor.call('insertMeta', {
            value: $('#unlock :selected').val(),
            type: 'unlockLink',
            userId: Meteor.user()._id
        });

    },
    'click #assign-course': function() {

        // Refresh
        Meteor.call('assignCourse', $('#users :selected').val(), $('#courses :selected').val());

    },

    'click #set-language': function() {

        // Insert
        Meteor.call('insertMeta', {
            value: $('#language').val(),
            type: 'language',
            userId: Meteor.user()._id
        });

    }
});

Template.settings.helpers({

    domain: function() {

        if (Meteor.user().role == 'admin') {
            return Meteor.absoluteUrl();
        } else {

            var hostnameArray = document.location.hostname.split(".");

            if (hostnameArray.length == 3) {
                return Meteor.user().domain + '.' + hostnameArray[1] + '.' + hostnameArray[2];

            } else {
                return Meteor.user().domain + '.' + hostnameArray[0] + '.' + hostnameArray[1];
            }

        }

    },
    students: function() {
        return Meteor.users.find({ role: 'student', teacherId: Meteor.user()._id });
    },
    userEmail: function() {
        return Meteor.user().contactEmail;
    },
    userName: function() {
        return Meteor.user().userName;
    },
    courses: function() {
        return Courses.find({ userId: Meteor.user()._id });
    }
});
