Template.registerHelper("truncate", function(number) {
    return number.toFixed(0);
});

Template.registerHelper("truncateTwo", function(number) {
    return number.toFixed(2);
});


Template.registerHelper("isTheme", function(theme) {
    if (Metas.findOne({ type: 'theme' })) {

        if (Metas.findOne({ type: 'theme' }).value == theme) {
            return true;
        }

    } else {
        if (theme == 'full') {
            return true;
        }
    }
});

Template.registerHelper("isAdmin", function() {

    if (Meteor.user()) {

        if (Meteor.user().emails[0].address == 'marcolivier.schwartz@gmail.com') {
            return true;
        } else {
            return false;
        }
    }


});

Template.registerHelper("getMeta", function(meta) {
    return Metas.findOne({ type: meta }).value;
});
