Meteor.methods({

    changeLessonOrder: function(lessonId, orderChange) {

        // Get lesson
        var lesson = Lessons.findOne(lessonId);
        var baseQuery = { courseId: lesson.courseId };
        if (lesson.moduleId) {
            baseQuery.moduleId = lesson.moduleId;
        }
        var currentOrder = lesson.order;
        var lessons = Lessons.find(baseQuery).fetch();

        if (lessons.length == currentOrder && orderChange == 1) {
            console.log('Not changing order');
        } else if (currentOrder == 0 && orderChange == -1) {
            console.log('Not changing order');
        } else {

            console.log('Changing order');

            if (orderChange == 1) {
                baseQuery.order = currentOrder + 1;
                var pastElement = Lessons.findOne(baseQuery);
            }
            if (orderChange == -1) {
                baseQuery.order = currentOrder - 1;
                var pastElement = Lessons.findOne(baseQuery);
            }

            // Current element
            Lessons.update(lessonId, { $inc: { order: orderChange } });

            // Past
            if (orderChange == 1) {
                Lessons.update(pastElement._id, { $inc: { order: -1 } });
            }
            if (orderChange == -1) {
                Lessons.update(pastElement._id, { $inc: { order: 1 } });
            }
        }

    },

    addLesson: function(lesson) {

        // Order
        query = { courseId: lesson.courseId };

        if (lesson.moduleId) {
            query.moduleId = lesson.moduleId;
        }

        var order = Lessons.find(query).fetch().length + 1;
        lesson.order = order;

        // Add
        console.log(lesson);
        Lessons.insert(lesson);

    },
    deleteLesson: function(lessonId) {

        // Remove
        Lessons.remove(lessonId);
    }

});
