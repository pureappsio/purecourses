// Import SendGrid
import sendgridModule from 'sendgrid';
const sendgrid = require('sendgrid')(Meteor.settings.sendGridAPIKey);

Meteor.methods({

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

            // Create
            var userId = Accounts.createUser({
                email: data.email,
                password: password
            });

            // Return password
            answer.password = password;
            answer.message = "User created";

        }

        // Return userID
        answer.userId = userId;

        // Update products
        Meteor.call('assignCourse', userId, data.courses);

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
    // assignProducts: function(userId, products) {

    //     // Get existing user products
    //     var user = Meteor.users.findOne(userId);

    //     if (user.products) {
    //         var existingProducts = user.products;
    //     } else {
    //         var existingProducts = [];
    //     }

    //     // Assign new products
    //     for (i = 0; i < products.length; i++) {
    //         if (existingProducts.indexOf(products[i]) == -1) {
    //             existingProducts.push(products[i]);
    //         }
    //     }

    //     // Update
    //     console.log(existingProducts);
    //     Meteor.users.update(userId, { $set: { products: existingProducts } });

    // },
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
        // console.log(existingCourses);
        Meteor.users.update(userId, { $set: { courses: existingCourses } });
        // console.log(Meteor.users.findOne(userId));

    },
    getAllUsers: function() {

        return Meteor.users.find({}).fetch();

    }

});
