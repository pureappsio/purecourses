Template.course.events({

    'click .publish': function() {

        Meteor.call('changeCourseStatus', this._id, 'published');

    },
    'click .unpublish': function() {

        Meteor.call('changeCourseStatus', this._id, 'draft');

    }

});

Template.course.helpers({

    published: function() {
        if (this.status) {

            if (this.status == 'draft') {
                return false;
            } else {
                return true;
            }

        } else {
            return true;
        }
    },

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
