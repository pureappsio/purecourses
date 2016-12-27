Template.message.events({

  'click #send-email': function() {

    email = {
      userId: Meteor.user()._id,
      courseId: $('#course-id :selected').val(),
      subject: $('#email-subject').val(),
      text: $('#email-text').summernote('code')
    }

    Meteor.call('sendEmail', email);
  }

});

Template.message.helpers({

  courses: function() {
    return Courses.find({});
  }

});

Template.message.onRendered(function() {

  $('#email-text').summernote({
      height: 300
    });

});