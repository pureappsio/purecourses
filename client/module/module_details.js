Template.moduleDetails.events({

  'click #add-lesson': function() {

  	// Module
  	lesson = {
  	  name: $('#lesson-name').val(),
      url: $('#lesson-url').val(),
      order: parseFloat($('#lesson-order').val()),
      moduleId: this._id,
      courseId: this.courseId
  	};

  	// Add
  	Meteor.call('addLesson', lesson);
  },
   'click #add-resource': function() {

    // Module
    resource = {
      name: $('#resource-name').val(),
      url: $('#resource-url').val(),
      type: $('#resource-type :selected').val(),
      moduleId: this._id,
      courseId: this.courseId
    };

    // Add
    Meteor.call('addResource', resource);
  }

});

Template.moduleDetails.helpers({

  lessons: function() {
  	return Lessons.find({moduleId: this._id}, {sort: {order: 1}});
  },
  resources: function() {
    return Resources.find({moduleId: this._id});
  },
  areResources: function() {
    if (Resources.find({moduleId: this._id}).fetch().length == 0) {
      return false;
    }
    else {
      return true;
    }
  }

});