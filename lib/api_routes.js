// API
Router.route("/api/courses", { where: "server" }).get(function() {

    // Get data
    var courses = Courses.find({}).fetch();
    var key = this.params.query.key;

    // Send response
    this.response.setHeader('Content-Type', 'application/json');
    if (Meteor.call('validateApiKey', key)) {
        this.response.end(JSON.stringify({ courses: courses }));
    } else {
        this.response.end(JSON.stringify({ message: "API key invalid" }));
    }

});

Router.route("/api/modules", { where: "server" }).get(function() {

    // Get data
    var query = {};

    if (this.params.query.course) {
        query.courseId = this.params.query.course;
    }

    var modules = Modules.find(query).fetch();
    var key = this.params.query.key;

    // Send response
    this.response.setHeader('Content-Type', 'application/json');
    if (Meteor.call('validateApiKey', key)) {
        this.response.end(JSON.stringify({ modules: modules }));
    } else {
        this.response.end(JSON.stringify({ message: "API key invalid" }));
    }

});

Router.route("/api/lessons", { where: "server" }).get(function() {

    // Get data
    var query = {};
    
    if (this.params.query.course) {
        query.courseId = this.params.query.course;
    }

     if (this.params.query.module) {
        query.moduleId = this.params.query.module;
    }

    var lessons = Lessons.find(query).fetch();
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

    // Get data
    var query = {};
    
    if (this.params.query.course) {
        query.courseId = this.params.query.course;
    }

     if (this.params.query.module) {
        query.moduleId = this.params.query.module;
    }

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
        if (data.email && data.courses) {
            var answer = Meteor.call('createNewUser', data);
            this.response.end(JSON.stringify(answer));
        } else {
            this.response.end(JSON.stringify({ message: "Invalid data" }));
        }

    } else {
        this.response.end(JSON.stringify({ message: "API key invalid" }));
    }

});
