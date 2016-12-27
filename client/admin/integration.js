Template.integration.events({

  'click .delete-integration': function() {
  	Meteor.call('removeIntegration', this._id);
  }

});