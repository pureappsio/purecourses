Template.message.events({

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

    courses: function() {
        return Courses.find({});
    }

});

Template.message.onRendered(function() {

    // Init editor
    CKEDITOR.replace('email-text');

});
