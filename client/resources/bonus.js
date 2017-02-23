Template.bonus.events({

  'click .delete-bonus': function() {

  	// Add
  	Meteor.call('removeBonus', this._id);
  }

});