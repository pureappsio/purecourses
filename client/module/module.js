Template.module.events({

  'click .delete': function() {

  	// Add
  	Meteor.call('deleteModule', this._id);
  }

});