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

    if (Session.get('preview')) {
        return false;

    } else {
        if (Meteor.user()) {

            if (Meteor.user().role == 'admin') {
                return true;
            }
        }
    }

});

Template.registerHelper("isAppUser", function() {

    if (Session.get('preview')) {
        return false;

    } else {
        if (Meteor.user()) {

            if (Meteor.user().role == 'appuser' || Meteor.user().role == 'admin') {
                return true;
            }
        }
    }

});

Template.registerHelper("getMeta", function(meta) {
    return Metas.findOne({ type: meta, userId: Meteor.user()._id }).value;
});
