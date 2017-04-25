Template.editCourse.rendered = function() {

    // Access 
    $('#access').val(this.data.access);

};

Template.editCourse.events({

    'click .delete': function() {

        // Add
        Meteor.call('deleteCourse', this._id, function(err, data) {
            Router.go('/');
        });
    },

    'click #edit-course': function() {

        // Course
        course = {
            // imgUrl: $('#course-img-url').val(),
            name: $('#course-name').val(),
            access: $('#access :selected').val(),
            _id: this._id,
            salesPage: $('#course-sales-page').val(),
            userId: Meteor.user()._id
        }

        if (this.imgId) {
            course.imgId = this.imgId;
        }

        if (Session.get('coursePicture')) {
            course.imgId = Session.get('coursePicture');
        }

        // Add
        Meteor.call('editCourse', course, function() {
            $('.confirmation-message').show();
            $('.confirmation-message').fadeOut(2000);
        });
    }

});
