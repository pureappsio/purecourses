import Files from '../imports/api/files';

Meteor.methods({

    resetStudentPassword(userId, password) {

        // Set new password
        Accounts.setPassword(userId, password);

    },
    addBonus: function(data) {

        // Insert
        console.log(data);
        Bonuses.insert(data);

    },
    removeBonus: function(data) {

        // Insert
        Bonuses.remove(data);

    },
    getAllowedBonuses: function(userId, courseId) {

        // Get user
        var user = Meteor.users.findOne(userId);

        if (user.role == 'admin' || user.role == 'appuser') {
            var query = { courseId: courseId, userId: userId };
        } else {
            var query = { courseId: courseId, userId: user.teacherId };
        }
        var bonuses = Bonuses.find(query, { sort: { order: 1 } }).fetch();

        var allowedBonuses = [];

        if (user.bonuses) {

            if (user.bonuses[courseId]) {
                var paidBonuses = user.bonuses[courseId];

                for (i in bonuses) {
                    if (paidBonuses.indexOf(bonuses[i]._id) != -1) {
                        allowedBonuses.push(bonuses[i]);
                    }
                }

            } else {
                allowedBonuses = bonuses;
            }

        } else {
            allowedBonuses = bonuses;
        }

        return allowedBonuses;

    },

});
