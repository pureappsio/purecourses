Template.user.helpers({
    email: function() {
        return this.emails[0].address;
    },
    nbProducts: function() {
        return this.courses.length;
    },
    teacher: function() {
        if (this.teacherId) {
            return Meteor.users.findOne(this.teacherId).emails[0].address;
        }
    }

});

Template.user.events({
    'click .user-delete': function() {
        Meteor.call('deleteUser', this._id);
    }
});
