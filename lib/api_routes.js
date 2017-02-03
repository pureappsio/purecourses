// API
Router.route("/api/courses", { where: "server" } ).get( function() {

  // Get data
  var courses = Courses.find({}).fetch();
  var key = this.params.query.key;

  // Send response
  this.response.setHeader('Content-Type', 'application/json');
  if (Meteor.call('validateApiKey', key)) {
  	this.response.end(JSON.stringify({courses: courses}));
  }
  else {
  	this.response.end(JSON.stringify({message: "API key invalid"}));
  }

});

Router.route("/api/users", { where: "server" } ).post( function() {

  // Get post data
  var data = this.request.body;
  var key = this.params.query.key;

  this.response.setHeader('Content-Type', 'application/json');
  if (Meteor.call('validateApiKey', key)) {

    // Check data
    if (data.email && data.courses) {
      var answer = Meteor.call('createNewUser', data);
      this.response.end(JSON.stringify(answer));
    }
    else {
      this.response.end(JSON.stringify({message: "Invalid data"}));
    }

  }
  else {
    this.response.end(JSON.stringify({message: "API key invalid"}));
  }

});