Meteor.methods({

    getAllowedCourses: function(userId) {

        // Get user
        var user = Meteor.users.findOne(userId);
        var courses = Courses.find({}).fetch();
        var allowedCourses = [];

        if (user.courses) {

            var userCourses = user.courses;

            for (j = 0; j < courses.length; j++) {
                if (userCourses.indexOf(courses[j]._id) != -1 || courses[j].access == 'free') {
                    allowedCourses.push(courses[j]);
                }
            }
        } else {

            // Look for free courses
            for (j = 0; j < courses.length; j++) {
                if (courses[j].access == 'free') {
                    allowedCourses.push(courses[j]);
                }
            }

        }

        return allowedCourses;

    },

    getPossibleCourses: function(userId) {

        // Get all & allowed
        var allowedCourses = Meteor.call('getAllowedCourses', userId);
        var courses = Courses.find({}).fetch();

        // Subsctract
        var possibleCourses = [];
        for (i in courses) {
            addCourse = true;
            for (j in allowedCourses) {
                if (courses[i]._id == allowedCourses[j]._id) {
                    var addCourse = false;
                }
            }
            if (addCourse) {
                possibleCourses.push(courses[i]);
            }
        }
        
        return possibleCourses;

    },

    addCourse: function(course) {

        // Add
        Courses.insert(course);

    },
    editCourse: function(courseData) {

        console.log(courseData);

        // Get current products
        // var course = Courses.findOne(courseData._id);
        // var products = course.products;

        // if (products) {
        //     // Update products
        //     if (courseData.products) {
        //         for (i = 0; i < courseData.products.length; i++) {
        //             if (products.indexOf(courseData.products[i]) == -1) {
        //                 products.push(courseData.products[i]);
        //             }
        //         }
        //     }

        //     courseData.products = products;

        // }

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
