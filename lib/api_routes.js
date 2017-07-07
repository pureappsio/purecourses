// API
Router.route("/api/courses", { where: "server" }).get(function() {

    // Get data
    var key = this.params.query.key;

    // Build query
    query = Meteor.call('buildApiQuery', this.params.query);

    var courses = Courses.find(query).fetch();

    // Send response
    this.response.setHeader('Content-Type', 'application/json');
    if (Meteor.call('validateApiKey', key)) {
        this.response.end(JSON.stringify({ courses: courses }));
    } else {
        this.response.end(JSON.stringify({ message: "API key invalid" }));
    }

});

Router.route("/api/modules", { where: "server" }).get(function() {

    // Build query
    query = Meteor.call('buildApiQuery', this.params.query);

    var modules = Modules.find(query, { sort: { order: 1 } }).fetch();
    var key = this.params.query.key;

    if (this.params.query.lessons) {

        // Get all lessons
        for (i in modules) {
            var lessons = Lessons.find({ moduleId: modules[i]._id }).fetch();
            modules[i].lessons = lessons;
        }

    }

    // Send response
    this.response.setHeader('Content-Type', 'application/json');
    if (Meteor.call('validateApiKey', key)) {
        this.response.end(JSON.stringify({ modules: modules }));
    } else {
        this.response.end(JSON.stringify({ message: "API key invalid" }));
    }

});

Router.route("/api/lessons", { where: "server" }).get(function() {

    // Build query
    query = Meteor.call('buildApiQuery', this.params.query);

    var lessons = Lessons.find(query, { sort: { order: 1 } }).fetch();
    var key = this.params.query.key;

    // Send response
    this.response.setHeader('Content-Type', 'application/json');
    if (Meteor.call('validateApiKey', key)) {
        this.response.end(JSON.stringify({ lessons: lessons }));
    } else {
        this.response.end(JSON.stringify({ message: "API key invalid" }));
    }

});

Router.route("/api/lessons/:id", { where: "server" }).get(function() {

    // Get data
    var lesson = Lessons.findOne(this.params.id);
    var key = this.params.query.key;

    // Send response
    this.response.setHeader('Content-Type', 'application/json');
    if (Meteor.call('validateApiKey', key)) {
        this.response.end(JSON.stringify(lesson));
    } else {
        this.response.end(JSON.stringify({ message: "API key invalid" }));
    }

});

Router.route("/api/bonuses", { where: "server" }).get(function() {

    // Build query
    query = Meteor.call('buildApiQuery', this.params.query);

    var bonuses = Bonuses.find(query).fetch();
    var key = this.params.query.key;

    // Send response
    this.response.setHeader('Content-Type', 'application/json');
    if (Meteor.call('validateApiKey', key)) {
        this.response.end(JSON.stringify({ bonuses: bonuses }));
    } else {
        this.response.end(JSON.stringify({ message: "API key invalid" }));
    }

});

Router.route("/api/users", { where: "server" }).post(function() {

    // Get post data
    var data = this.request.body;
    var key = this.params.query.key;

    this.response.setHeader('Content-Type', 'application/json');
    if (Meteor.call('validateApiKey', key)) {

        // Check data
        if (data.role) {

            if (data.role == 'appuser' && data.email && data.password) {
                var answer = Meteor.call('createNewAppUser', data);
                this.response.end(JSON.stringify(answer));
            } else {
                this.response.end(JSON.stringify({ message: "Invalid data" }));
            }

        } else {
            if (data.email && data.courses) {
                var answer = Meteor.call('createNewUser', data);
                this.response.end(JSON.stringify(answer));
            } else {
                this.response.end(JSON.stringify({ message: "Invalid data" }));
            }
        }


    } else {
        this.response.end(JSON.stringify({ message: "API key invalid" }));
    }

});

// Router.route("/api/login", { where: "server" }).post(function() {

//     // Get post data
//     var data = this.request.body;

//     if (data.email && data.password) {

//         Meteor.loginWithPassword($('#email').val(), $('#password').val());

//     }

//     // Send response
//     this.response.writeHead(302, {
//         'Location': Meteor.absoluteUrl()
//     });
//     this.response.end();

// });

Router.route('/api/status', { where: 'server' }).get(function() {

    this.response.setHeader('Content-Type', 'application/json');
    this.response.end(JSON.stringify({ message: 'System online' }));

});
