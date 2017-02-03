Meteor.methods({

	addLesson: function(lesson) {

        // Add
        console.log(lesson);
        Lessons.insert(lesson);

    },
    deleteLesson: function(lessonId) {

        // Remove
        Lessons.remove(lessonId);
    }

});