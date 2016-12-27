Template.lesson.events({

  'click .delete': function() {

  	// Add
  	Meteor.call('deleteLesson', this._id);
  }

});