Meteor.startup(function() {

    // Process url
    process.env.MAIL_URL = Meteor.settings.mailURL;

    // Allow delete users
    Meteor.users.allow({
        remove: function() {
            return true;
        }
    });

});
