Meteor.methods({

    setLanguage: function(language) {

        Meteor.users.update(Meteor.user()._id, { $set: { language: language } });

    },
    checkLanguage: function() {

        if (Meteor.users.findOne({ language: { $exists: true } })) {
            var language = Meteor.users.findOne({ language: { $exists: true } }).language;
        } else {
            var language = 'en';
        }

        return language;

    },
    setTitle: function(title) {

        Meteor.users.update(Meteor.user()._id, { $set: { title: title } });

    },
    getTitle: function(title) {

        if (Meteor.users.findOne({ title: { $exists: true } })) {
            var title = Meteor.users.findOne({ title: { $exists: true } }).title;
        } else {
            var title = 'Learn';
        }

        return title;

    }

});
