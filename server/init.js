Meteor.startup(function() {

    // Process url
    process.env.MAIL_URL = "smtp://marcoschwartz:Beyond2008!@smtp.sendgrid.net:587";

    // Allow delete users
    Meteor.users.allow({
        remove: function() {
            return true;
        }
    });

});
