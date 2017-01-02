Meteor.startup(function() {

    // Process url
    process.env.MAIL_URL = "";

    // Allow delete users
    Meteor.users.allow({
        remove: function() {
            return true;
        }
    });

});
