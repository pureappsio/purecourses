Meteor.methods({

    getUsersEmails: function() {

        var users = Meteor.users.find({}).fetch();

        var emails = [];

        for (i in users) {

            emails.push(users[i].emails[0].address);

        }

        return emails;

    },
    assignTeacher: function(userId, studentId) {

        Meteor.users.update(studentId, { $set: { teacherId: userId } });

    },
    setCourseOwner: function(userId, courseId) {

        console.log(courseId);
        console.log(userId);

        Courses.update(courseId, { $set: { userId: userId } });

    },
    setUserRole: function(userId, role) {

        Meteor.users.update(userId, { $set: { role: role } });

    },
    getUserDomain: function(domain) {

        if (domain == 'admin') {
            return Meteor.users.findOne({ role: domain });
        } else {
            if (Meteor.users.findOne({ domain: domain })) {
                return Meteor.users.findOne({ domain: domain });
            } else {
                return Meteor.users.findOne({ role: 'admin' });
            }
        }

    },
    checkLanguage: function(userId) {

        if (Metas.findOne({ type: 'language', userId: userId })) {
            var language = Metas.findOne({ type: 'language', userId: userId }).value;
        } else {
            var language = 'en';
        }

        return language;

    },
    getTitle: function(userId) {

        if (Metas.findOne({ type: 'title', userId: userId })) {
            var title = Metas.findOne({ type: 'title', userId: userId }).value;
        } else {
            var title = 'Learn';
        }

        return title;

    }

});
