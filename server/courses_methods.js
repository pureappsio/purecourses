import Files from '../imports/api/files';

Meteor.methods({

    changeCourseStatus: function(courseId, status) {

        Courses.update(courseId, { $set: { status: status } });

    },
    addCourse: function(course) {

        // Add
        console.log(course);
        Courses.insert(course);

    },
    editCourse: function(courseData) {

        console.log(courseData);

        // Update course
        Courses.update(courseData._id, courseData);

    },
    deleteCourse: function(courseId) {

        // Remove course
        Courses.remove(courseId);

        // Remove all modules
        Modules.remove({ courseId: courseId });

        // Remove all lessons
        Lessons.remove({ courseId: courseId });

    }

});
