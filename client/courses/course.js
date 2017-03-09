Template.course.events({

    'click .delete': function() {

        // Add
        Meteor.call('deleteCourse', this._id);
    }

});

Template.course.helpers({

    url: function() {

        if (this.imgUrl) {
            return this.imgUrl;
        }
        if (this.imgId) {
        	console.log(Files.findOne(this.imgId));
            return Files.findOne(this.imgId).link();
        }

    }

});
