import Files from '../imports/api/files';

Meteor.methods({

    // getAllowedCourses: function(userId) {

    //     // Get user
    //     var user = Meteor.users.findOne(userId);

    //     // Get courses
    //     if (user.role == 'admin' || user.role == 'appuser') {
    //         var courses = Courses.find({ userId: userId }).fetch();
    //     } else {
    //         var courses = Courses.find({ userId: user.teacherId }).fetch();
    //     }

    //     var allowedCourses = [];

    //     if (user.role == 'admin' || user.role == 'appuser') {

    //         allowedCourses = courses;

    //     } else {

    //         if (user.courses) {

    //             var userCourses = user.courses;

    //             for (j = 0; j < courses.length; j++) {
    //                 if (userCourses.indexOf(courses[j]._id) != -1 || courses[j].access == 'free') {
    //                     allowedCourses.push(courses[j]);
    //                 }
    //             }
    //         } else {

    //             // Look for free courses
    //             for (j = 0; j < courses.length; j++) {
    //                 if (courses[j].access == 'free') {
    //                     allowedCourses.push(courses[j]);
    //                 }
    //             }

    //         }

    //     }

    //     return allowedCourses;

    // },

    // getPossibleCourses: function(userId) {

    //     // Get all & allowed
    //     var allowedCourses = Meteor.call('getAllowedCourses', userId);

    //     // Get user
    //     var user = Meteor.users.findOne(userId);

    //     // Get courses
    //     if (user.role == 'admin' || user.role == 'appuser') {
    //         var courses = Courses.find({ userId: userId }).fetch();
    //     } else {
    //         var courses = Courses.find({ userId: user.teacherId }).fetch();
    //     }

    //     // Subsctract
    //     var possibleCourses = [];
    //     for (i in courses) {
    //         addCourse = true;
    //         for (j in allowedCourses) {
    //             if (courses[i]._id == allowedCourses[j]._id) {
    //                 var addCourse = false;
    //             }
    //         }
    //         if (addCourse) {
    //             possibleCourses.push(courses[i]);
    //         }
    //     }

    //     return possibleCourses;

    // },

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
