Template.home.helpers({

    courses: function() {
        if (Meteor.user()) {

            if (Meteor.user().role == 'admin' || Meteor.user().role == 'appuser') {
                return Courses.find({ userId: Meteor.user()._id });
            } else {
                return Courses.find({
                    $or: [
                        { userId: Meteor.user().teacherId, _id: { $in: Meteor.user().courses } },
                        { userId: Meteor.user().teacherId, access: 'free' },
                    ]
                });
            }
        }

    },
    possibleCourses: function() {
        if (Meteor.user()) {
            if (Meteor.user().role == 'admin' || Meteor.user().role == 'appuser') {
                return [];
            } else {
                return Courses.find({
                    userId: Meteor.user().teacherId,
                    _id: { $nin: Meteor.user().courses },
                    access: 'paid'
                });
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
