Meteor.methods({
    addResource: function(data) {

        // Insert
        Resources.insert(data);

    },
    removeResource: function(data) {

        // Insert
        Resources.remove(data);

    }

});
