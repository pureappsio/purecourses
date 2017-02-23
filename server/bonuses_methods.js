Meteor.methods({
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
        var bonuses = Bonuses.find({ courseId: courseId }, { sort: { order: 1 } }).fetch();

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
