// Import SendGrid
import sendgridModule from 'sendgrid';
const sendgrid = require('sendgrid')(Meteor.settings.sendGridAPIKey);

Meteor.methods({

    setUserData: function(name, email) {

        Meteor.users.update(Meteor.user()._id, { $set: { userName: name } });
        Meteor.users.update(Meteor.user()._id, { $set: { contactEmail: email } });

    },
    sendEmail: function(emailData) {

        // Find all students
        var students = [];
        users = Meteor.users.find({}).fetch();
        for (i in users) {

            // Get allowed courses
            var courses = Meteor.call('getAllowedCourses', users[i]._id);

            // Put courses in array
            var coursesArray = [];
            for (c in courses) {
                coursesArray.push(courses[c]._id);
            }

            if (coursesArray.indexOf(emailData.courseId) != -1) {
                students.push(users[i].emails[0].address);
            }

        }

        // Build mail
        var helper = sendgridModule.mail;
        mail = new helper.Mail()

        // Get emails
        for (r = 0; r < students.length; r++) {

            personalization = new helper.Personalization();

            emailHelper = new helper.Email(students[r]);
            personalization.addTo(emailHelper);

            mail.addPersonalization(personalization);

        }

        // Common
        var user = Meteor.users.findOne(emailData.userId);
        email = new helper.Email(user.contactEmail, user.userName);
        mail.setFrom(email);
        mail.setSubject(emailData.subject);
        content = new helper.Content("text/html", emailData.text);
        mail.addContent(content);

        console.log(mail);

        // Send
        var requestBody = mail.toJSON()
        var request = sendgrid.emptyRequest()
        request.method = 'POST'
        request.path = '/v3/mail/send'
        request.body = requestBody
        sendgrid.API(request, function(err, response) {
            if (response.statusCode != 202) {
                console.log(response.body);
            }
        });

    },

    getProducts: function() {

        // Get integration
        var integration = Integrations.find({}).fetch()[0];

        if (integration) {
            // Make request
            var baseUrl = "http://" + integration.url + "/api/products?key=" + integration.key;
            try {
                var answer = HTTP.get(baseUrl).data.products;
            } catch (err) {
                var answer = [];
            }
        } else {
            var answer = [];
        }

        return answer;

    },
    addIntegration: function(data) {

        // Insert
        Integrations.insert(data);

    },
    removeIntegration: function(data) {

        // Insert
        Integrations.remove(data);

    },
    addResource: function(data) {

        // Insert
        Resources.insert(data);

    },
    removeResource: function(data) {

        // Insert
        Resources.remove(data);

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
        Meteor.call('assignProduct', userId, data.product);

        return answer;

    },

    deleteUser: function(userId) {

        console.log('Deleting user');

        Meteor.users.remove(userId);

    },
    validateApiKey: function(key) {

        var adminUser = Meteor.users.findOne({ apiKey: { $exists: true } });

        if (adminUser.apiKey == key) {
            return true;
        } else {
            return false;
        }

    },
    generateApiKey: function() {

        // Check if key exist
        if (!Meteor.user().apiKey) {

            // Generate key
            var key = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 16; i++) {
                key += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            console.log(key);

            // Update user
            Meteor.users.update(Meteor.user()._id, { $set: { apiKey: key } });
        }

    },

    setLanguage: function(language) {

        Meteor.users.update(Meteor.user()._id, { $set: { language: language } });

    },
    checkLanguage: function() {

        if (Meteor.users.findOne({ language: { $exists: true } })) {
            var language = Meteor.users.findOne({ language: { $exists: true } }).language;
        } else {
            var language = 'en';
        }

        return language;

    },
    setTitle: function(title) {

        Meteor.users.update(Meteor.user()._id, { $set: { title: title } });

    },
    getTitle: function(title) {

        if (Meteor.users.findOne({ title: { $exists: true } })) {
            var title = Meteor.users.findOne({ title: { $exists: true } }).title;
        } else {
            var title = 'Learn';
        }

        return title;

    },
    getAllowedCourses: function(userId) {

        // Get user
        var user = Meteor.users.findOne(userId);
        var courses = Courses.find({}).fetch();
        var allowedCourses = [];

        if (user.products) {


            var userProducts = user.products;

            for (i = 0; i < userProducts.length; i++) {
                for (j = 0; j < courses.length; j++) {
                    for (k = 0; k < courses[j].products.length; k++) {
                        if (courses[j].products[k] == userProducts[i] || courses[j].products[k] == 'free') {
                            allowedCourses.push(courses[j]);
                        }
                    }
                }
            }

        } else {

            // Look for free courses
            for (j = 0; j < courses.length; j++) {
                for (k = 0; k < courses[j].products.length; k++) {
                    if (courses[j].products[k] == 'free') {
                        allowedCourses.push(courses[j]);
                    }
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

        // // Get user
        // var user = Meteor.users.findOne(userId);
        // var courses = Courses.find({}).fetch();

        // if (user.products) {

        //     var possibleCourses = [];
        //     var userProducts = user.products;

        //     for (i = 0; i < userProducts.length; i++) {
        //         for (j = 0; j < courses.length; j++) {
        //             addCourse = true;

        //             for (k = 0; k < courses[j].products.length; k++) {
        //                 if (courses[j].products[k] == userProducts[i] || courses[j].products[k] == 'free') {
        //                     addCourse = false;
        //                 }
        //             }
        //             if (addCourse) {
        //                 possibleCourses.push(courses[j]);
        //             }

        //         }
        //     }

        //     return possibleCourses;

        // } else {

        //     return courses;

        // }

    },
    getAllowedModules: function(userId, courseId) {

        // Get user
        var user = Meteor.users.findOne(userId);
        var modules = Modules.find({ courseId: courseId }, { sort: { order: 1 } }).fetch();

        console.log(modules);

        var allowedModules = [];

        for (i = 0; i < modules.length; i++) {

            if (modules[i].products) {

                if (user.products) {

                    for (j = 0; j < user.products.length; j++) {

                        for (k = 0; k < modules[i].products.length; k++) {

                            if (modules[i].products[k] == user.products[j]) {
                                allowedModules.push(modules[i]);
                            }

                        }

                    }

                }
            } else {
                allowedModules.push(modules[i]);
            }

        }

        return allowedModules;

    },
    getProductSales: function(productId) {

        // Get integration
        var integration = Integrations.find({}).fetch()[0];

        // Make request
        var baseUrl = "https://" + integration.url + "/api/sales?key=" + integration.key;
        // baseUrl += '&product=' + productId;
        try {
            var answer = HTTP.get(baseUrl).data.sales;
        } catch (err) {
            var answer = [];
        }
        var sales = [];

        for (k = 0; k < answer.length; k++) {

            if (answer[k].products) {
                if ((answer[k].products).indexOf(productId) != -1) {
                    sales.push(answer[k]);
                }
            }

        }

        return sales;

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
    assignProducts: function(userId, products) {

        // Get existing user products
        var user = Meteor.users.findOne(userId);

        if (user.products) {
            var existingProducts = user.products;
        } else {
            var existingProducts = [];
        }

        // Assign new products
        for (i = 0; i < products.length; i++) {
            if (existingProducts.indexOf(products[i]) == -1) {
                existingProducts.push(products[i]);
            }
        }

        // Update
        console.log(existingProducts);
        Meteor.users.update(userId, { $set: { products: existingProducts } });

    },
    assignProduct: function(userId, product) {

        // Get existing user products
        var user = Meteor.users.findOne(userId);

        if (user.products) {
            var existingProducts = user.products;
        } else {
            var existingProducts = [];
        }

        // Assign new product
        if (existingProducts.indexOf(product) == -1) {
            existingProducts.push(product);
        }

        // Update
        console.log(existingProducts);
        Meteor.users.update(userId, { $set: { products: existingProducts } });

    },
    getAllUsers: function() {

        return Meteor.users.find({}).fetch();

    },
    resetProducts: function(data) {

        Products.remove({});

    },
    refreshProducts: function(data) {

        // Parameters
        var baseUrl = 'http://' + data.url + '/edd-api/products/';
        var token = data.token;
        var key = data.key;

        console.log(data);

        // Query
        request = baseUrl + '?key=' + key + '&token=' + token + '&number=50';
        res = HTTP.get(request);

        // Get products
        var products = res.data.products;

        for (i = 0; i < products.length; i++) {

            var product = Products.findOne({ eddId: products[i].info.id });

            if (product) {

                console.log('Product already present');

            } else {

                // Insert
                product = {
                    eddId: products[i].info.id,
                    name: products[i].info.title
                }
                Products.insert(product);
            }

        }

    },
    addCourse: function(course) {

        // Add
        Courses.insert(course);

    },
    editCourse: function(courseData) {

        console.log(courseData);

        // Get current products
        var course = Courses.findOne(courseData._id);
        var products = course.products;

        if (products) {
            // Update products
            if (courseData.products) {
                for (i = 0; i < courseData.products.length; i++) {
                    if (products.indexOf(courseData.products[i]) == -1) {
                        products.push(courseData.products[i]);
                    }
                }
            }

            courseData.products = products;

        }

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

    },
    addModule: function(module) {

        // Add
        Modules.insert(module);

    },
    editModule: function(moduleData) {

        console.log(moduleData);

        // Get current products
        var module = Modules.findOne(moduleData._id);

        if (moduleData.products) {

            if (module.products) {
                var products = module.products;

                // Update products
                for (i = 0; i < moduleData.products.length; i++) {
                    if (products.indexOf(moduleData.products[i]) == -1) {
                        products.push(moduleData.products[i]);
                    }
                }

                moduleData.products = products;
            }

        }

        // Update module
        Modules.update(moduleData._id, moduleData);

    },
    deleteModule: function(moduleId) {

        // Remove
        Modules.remove(moduleId);

        // Remove all lessons
        Lessons.remove({ moduleId: moduleId });

    },
    addLesson: function(lesson) {

        // Add
        Lessons.insert(lesson);

    },
    deleteLesson: function(lessonId) {

        // Remove
        Lessons.remove(lessonId);
    }

});
