Template.message.events({

    'change #course-id, click #course-id': function() {

        var course = $('#course-id :selected').val();
        var users = Meteor.users.find({ courses: course }).fetch();

        console.log(users);

        Session.set('receivers', users.length)

    },
    'click #send-email': function() {

        email = {
            userId: Meteor.user()._id,
            courseId: $('#course-id :selected').val(),
            subject: $('#email-subject').val(),
            text: CKEDITOR.instances['email-text'].getData()
        }

        Meteor.call('sendEmail', email, function(err, data) {

            $('#sent-notification').show();
            $("#sent-notification").fadeOut("slow");

        });
    }

});

Template.message.helpers({

    receivers: function() {
        if (Session.get('receivers')) {
            return Session.get('receivers');
        }
    },
    courses: function() {
        return Courses.find({});
    }

});

Template.message.onRendered(function() {

    // Init editor
    CKEDITOR.replace('email-text');

});
