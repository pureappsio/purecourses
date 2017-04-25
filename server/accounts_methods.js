// Import SendGrid
import sendgridModule from 'sendgrid';
const sendgrid = require('sendgrid')(Meteor.settings.sendGridAPIKey);

Meteor.methods({

    buildApiQuery: function(inputQuery) {

        var query = {};

        if (inputQuery.user) {

            // Look for user
            var user = Meteor.users.findOne({ "emails.address": inputQuery.user });
            if (user) {
                query.userId = user._id;
            } else {
                query.userId = { $exists: false };
            }
        }

        if (inputQuery.course) {
            query.courseId = inputQuery.course;
        }

        if (inputQuery.module) {
            query.moduleId = inputQuery.module;
        }

        return query;

    },
    setUserDomain: function(domain) {

        Meteor.users.update(Meteor.user()._id, { $set: { domain: domain } });

        console.log(Meteor.user());

    },
    createAccounts: function(password) {

        // Get all products
        var products = Meteor.call('getProducts');
        console.log('Number of products with API: ' + products.length);

        for (p in products) {

            console.log('Processing for product: ' + products[p].name);

            // Get all sales
            var sales = Meteor.call('getProductSales', products[p]._id);
            // console.log(sales);

            // Create accounts
            for (s in sales) {

                if (sales[s].success == true) {

                    // Check if exist
                    if (Meteor.users.findOne({ "emails.0.address": sales[s].email })) {

                        console.log('Already existing user');
                        var userId = Meteor.users.findOne({ "emails.0.address": sales[s].email })._id;

                    } else {

                        console.log('Creating new user with email: ' + sales[s].email);
                        console.log(password);

                        // Create
                        var userId = Accounts.createUser({
                            email: sales[s].email,
                            password: password
                        });

                        console.log('Creating new user done')

                    }

                    // Assign product
                    Meteor.call('assignCourse', userId, products[p].courses);

                }

            }

        }

    },
    setUserData: function(name, email) {

        Meteor.users.update(Meteor.user()._id, { $set: { userName: name } });
        Meteor.users.update(Meteor.user()._id, { $set: { contactEmail: email } });

    },

    createUserAccount: function(data) {

        console.log(data);

        // Check if exist
        if (Meteor.users.findOne({ "emails.0.address": data.email })) {

            console.log('Updating existing user');
            var userId = Meteor.users.findOne({ "emails.0.address": data.email })._id;

        } else {

            console.log('Creating new user');

            // Create
            var userId = Accounts.createUser({
                email: data.email,
                password: data.password
            });

            // Assign role & teacher ID
            Meteor.users.update(userId, { $set: { role: data.role } });
            if (data.teacherId) {
                Meteor.users.update(userId, { $set: { teacherId: data.teacherId } });
            }

        }

        return userId;

    },
    createNewAppUser: function(data) {

        console.log(data);

        // Prepare answer
        answer = {};

        // Check if exist
        if (Meteor.users.findOne({ "emails.0.address": data.email })) {

            console.log('Updating existing user');
            var userId = Meteor.users.findOne({ "emails.0.address": data.email })._id;
            answer.message = "User already exists";

        } else {

            console.log('Creating new user');

            // Create
            var userId = Accounts.createUser({
                email: data.email,
                password: data.password
            });

            // Assign role
            Meteor.users.update(userId, { $set: { role: 'appuser' } });

        }

        // Return userID
        answer.userId = userId;

        return answer;

    },
    createNewUser: function(data) {

        console.log(data);

        // Prepare answer
        answer = {};

        // Check if exist
        if (Meteor.users.findOne({ "emails.0.address": data.email })) {

            console.log('Updating existing user');
            var userId = Meteor.users.findOne({ "emails.0.address": data.email })._id;
            answer.message = "User updated";

        } else {

            console.log('Creating new user');

            if (data.password) {
                password = data.password;
            } else {

                // Generate password
                var password = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 8; i++) {
                    password += possible.charAt(Math.floor(Math.random() * possible.length));
                }
            }

            // Get teacher user
            if (data.teacherEmail) {
                var teacherUser = Meteor.users.findOne({ 'emails.address': data.teacherEmail });
            } else {
                var teacherUser = Meteor.users.findOne({ role: 'admin' });
            }

            // Create
            var userId = Accounts.createUser({
                email: data.email,
                password: password
            });

            // Update
            Meteor.users.update(userId, {
                $set: {
                    role: 'student',
                    teacherId: teacherUser._id
                }
            });

            // Return password
            answer.password = password;
            answer.message = "User created";

        }

        // Return userID
        answer.userId = userId;

        // Update products
        Meteor.call('assignCourse', userId, data.courses);

        if (data.modules) {
            Meteor.call('assignModules', userId, data.courses, data.modules);
        }
        if (data.bonuses) {
            Meteor.call('assignBonuses', userId, data.courses, data.bonuses);
        }

        console.log(Meteor.users.findOne(userId));

        return answer;

    },

    deleteUser: function(userId) {

        console.log('Deleting user');

        Meteor.users.remove(userId);

    },


    assignProductAll: function(product) {

        // Get all sales for this product
        var sales = Meteor.call('getProductSales', product);

        // Create user or update
        for (i in sales) {

            Meteor.call('createNewUser', {
                email: sales[i].email,
                product: product,
                password: 'beginnerscourse'
            });

        }

    },
    createUsers: function() {

        // Create admin user
        var adminUser = {
            email: Meteor.settings.adminUser.email,
            password: Meteor.settings.adminUser.password,
            role: 'admin'
        }
        Meteor.call('createAdminUser', adminUser);

    },
    createStudentAccount: function(data) {

        console.log(data);

        // Check if exist
        if (Meteor.users.findOne({ "emails.0.address": data.email })) {

            console.log('User already created');
            var userId = Meteor.users.findOne({ "emails.0.address": data.email })._id;

        } else {

            console.log('Creating new user');

            // Create
            var userId = Accounts.createUser(data);

            // Change role
            Meteor.users.update(userId, { $set: { role: data.role } });
            Meteor.users.update(userId, { $set: { teacherId: data.teacherId } });
            console.log(Meteor.users.findOne(userId));

        }

    },
    createAdminUser: function(data) {

        // Check if exist
        if (Meteor.users.findOne({ "emails.0.address": data.email })) {

            console.log('User already created');
            Meteor.users.update({ "emails.0.address": data.email }, { $set: { role: data.role } });
            var userId = Meteor.users.findOne({ "emails.0.address": data.email })._id;

        } else {

            console.log('Creating new user');

            // Create
            var userId = Accounts.createUser(data);

            // Change role
            Meteor.users.update(userId, { $set: { role: data.role } });
            console.log(Meteor.users.findOne(userId));

        }

    },
    assignCourses: function(userId, courses) {

        // Get existing user courses
        var user = Meteor.users.findOne(userId);

        if (user.courses) {
            var existingCourses = user.courses;
        } else {
            var existingCourses = [];
        }

        // Assign new courses
        if (existingCourses.indexOf(courses) == -1) {
            existingCourses.push(courses);
        }

        // Update
        console.log(existingCourses);
        Meteor.users.update(userId, { $set: { courses: existingCourses } });

    },
    assignCourse: function(userId, course) {

        // Get existing user courses
        var user = Meteor.users.findOne(userId);

        if (user.courses) {
            var existingCourses = user.courses;
        } else {
            var existingCourses = [];
        }

        // Assign new courses
        if (existingCourses.indexOf(course) == -1) {
            existingCourses.push(course);
        }

        // Update
        Meteor.users.update(userId, { $set: { courses: existingCourses } });

    },
    assignModules: function(userId, course, modules) {

        // Get existing user courses
        var user = Meteor.users.findOne(userId);

        if (user.modules) {
            var allModules = user.modules;
        } else {
            var allModules = {};
        }

        // Assign new courses
        allModules[course] = modules;

        // Update
        Meteor.users.update(userId, { $set: { modules: allModules } });

    },
    assignBonuses: function(userId, course, bonuses) {

        // Get existing user courses
        var user = Meteor.users.findOne(userId);

        if (user.bonuses) {
            var allBonuses = user.bonuses;
        } else {
            var allBonuses = {};
        }

        // Assign new courses
        allBonuses[course] = bonuses;

        // Update
        Meteor.users.update(userId, { $set: { bonuses: allBonuses } });

    },
    getAllUsers: function() {

        return Meteor.users.find({}).fetch();

    }

});
