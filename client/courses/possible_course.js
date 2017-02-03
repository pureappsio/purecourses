Template.possibleCourse.helpers({

    unlockLink: function() {

        return Session.get('unlockLink_' + this._id);

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
