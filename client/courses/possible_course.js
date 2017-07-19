Template.possibleCourse.helpers({

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

    unlockLink: function() {

        if (this.salesPage) {
            return this.salesPage;
        } else {
            if (Session.get('coursesProducts')) {
                return Session.get('coursesProducts')[this._id].url;
            }
        }

    },
    url: function() {

        if (this.imgUrl) {
            return this.imgUrl;
        }
        if (this.imgId) {
            return Files.findOne(this.imgId).link();
        }

    }

});

Template.possibleCourse.onRendered(function() {

});
