Template.courseAdmin.helpers({
    user: function() {
        if (this.userId) {
            return Meteor.users.findOne(this.userId).emails[0].address;
        }
    }

});
