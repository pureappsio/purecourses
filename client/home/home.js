Template.home.helpers({

    courses: function() {
        if (Meteor.user()) {
            if (Meteor.user().role == 'admin' || Meteor.user().role == 'appuser') {
                return Courses.find({ userId: Meteor.user()._id });
            } else {
                return Session.get('allowedCourses');
            }
        }

    },
    possibleCourses: function() {
        if (Meteor.user()) {
            if (Meteor.user().role == 'admin' || Meteor.user().role == 'appuser') {
                return [];
            } else {
                return Session.get('possibleCourses');
            }
        }

    }

});

Template.home.onRendered(function() {

    // Check language
    if (Session.get('language') == 'fr') {
        Session.set('coursesTitle', 'Formations');
    } else {
        Session.set('coursesTitle', 'Courses');
    }

    // Get user
    if (Meteor.user()) {

        var user = Meteor.user();

        // Get right courses
        Meteor.call('getAllowedCourses', user._id, function(err, courses) {
            Session.set('allowedCourses', courses);
        });

        Meteor.call('getPossibleCourses', user._id, function(err, courses) {
            Session.set('possibleCourses', courses);
        });
    }

});

Template.home.events({

    'click #add-course': function() {

        // Course 
        course = {
            name: $('#course-name').val(),
            access: $('#access :selected').val(),
            userId: Meteor.user()._id
        }
        if (Session.get('coursePicture')) {
            course.imgId = Session.get('coursePicture');
        }

        // Add
        Meteor.call('addCourse', course, function(err, data) {

            $('.confirmation-message').show();
            $('.confirmation-message').fadeOut(5000);

        });
    }

});
