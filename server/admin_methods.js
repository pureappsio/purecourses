Meteor.methods({

    assignTeacher: function(userId, studentId) {

        for (i in studentId) {
            Meteor.users.update(studentId[i], { $set: { teacherId: userId } });

        }

    },
    setCourseOwner: function(userId, courseId) {

        console.log(courseId);
        console.log(userId);

        for (i in courseId) {

            Courses.update(courseId[i], { $set: { userId: userId } });

        }

    },
    setUserRole: function(userId, role) {

        for (i in userId) {
            Meteor.users.update(userId[i], { $set: { role: role } });

        }

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
