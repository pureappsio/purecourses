Template.possibleCourse.helpers({

    unlockLink: function() {

        return Session.get('unlockLink_' + this._id);

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

    if (this.data) {

    	courseId = this.data._id;

        if (this.data.salesPage) {
            Session.set('unlockLink_' + courseId, this.data.salesPage);
        } else {
            Meteor.call('getProductLink', courseId, function(err, data) {
            	Session.set('unlockLink_' + courseId, data);
            });
        }
    }

});
