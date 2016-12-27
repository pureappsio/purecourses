Template.course.events({

  'click .delete': function() {

  	// Add
  	Meteor.call('deleteCourse', this._id);
  }

});