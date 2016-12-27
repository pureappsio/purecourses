Template.resource.events({

  'click .delete-resource': function() {

  	// Add
  	Meteor.call('removeResource', this._id);
  }

});