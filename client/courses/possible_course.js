Template.possibleCourse.helpers({

    unlockLink: function() {

        if (this.salesPage) {
            return this.salesPage;
        } else {
            if (Session.get('coursesProducts')) {
                return Session.get('coursesProducts')[this._id];
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
