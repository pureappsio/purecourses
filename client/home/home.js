Template.home.helpers({

    courses: function() {
        if (Meteor.user()) {

            if (Meteor.user().role == 'admin' || Meteor.user().role == 'appuser') {
                return Courses.find({ userId: Meteor.user()._id });
            } else {

                if (Meteor.user().courses) {
                    courses = Meteor.user().courses;
                }
                else {
                    courses = [];
                }

                return Courses.find({
                    $or: [
                        { userId: Meteor.user().teacherId, _id: { $in: courses } },
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

                if (Meteor.user().courses) {
                    courses = Meteor.user().courses;
                }
                else {
                    courses = [];
                }

                return Courses.find({
                    userId: Meteor.user().teacherId,
                    _id: { $nin: courses },
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
