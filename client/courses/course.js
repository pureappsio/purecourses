Template.course.events({



});

Template.course.helpers({

    courseContainerSize: function() {

        if (Meteor.user().role == 'admin' || Meteor.user().role == 'appuser') {
            userId = Meteor.user()._id;
        } else {
            userId = Meteor.user().teacherId;
        }

        if (Metas.findOne({ type: 'coursesLine', userId: userId })) {
            return Metas.findOne({ type: 'coursesLine', userId: userId }).value;
        } else {
            return 4;
        }

    },
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
