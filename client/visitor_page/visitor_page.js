Template.visitorPage.onRendered(function() {

    // Get all products
    Meteor.call('getProductsJson', Session.get('teacherId'), function(err, data) {

        Session.set('coursesProducts', data);

    });

});

Template.visitorPage.helpers({

    title: function() {
        return Metas.findOne({ type: 'frontMessage', userId: Session.get('teacherId') }).value;
    },
    image: function() {
        var picId = Metas.findOne({ type: 'frontPicture', userId: Session.get('teacherId') }).value;
        return Files.findOne(picId).link();
    },
    courses: function() {
        return Courses.find({
            userId: Session.get('teacherId'),
            status: { $ne: 'draft' }
        }, { limit: 6 });
    },
    isTitle: function() {
        if (Metas.findOne({ type: 'frontMessage', userId: Session.get('teacherId') })) {
            return true;
        }
    },
    featName: function() {

        // Get language
        if (Metas.findOne({ type: 'language', userId: Session.get('teacherId') })) {
            var language = Metas.findOne({ type: 'language', userId: Session.get('teacherId') }).value;
        } else {
            var language = 'en';
        }

        // Return
        if (Metas.findOne({ type: 'theme', userId: Session.get('teacherId') })) {

            if (Metas.findOne({ type: 'theme', userId: Session.get('teacherId') }).value == 'full') {

                if (language == 'fr') {
                    return 'Formations';
                } else {
                    return 'Featured Courses';
                }

            } else {
                if (language == 'fr') {
                    return 'Vidéos';
                } else {
                    return 'Featured Videos';
                }
            }

        } else {
            if (language == 'fr') {
                return 'Formations';
            } else {
                return 'Featured Courses';
            }
        }
    }

});
