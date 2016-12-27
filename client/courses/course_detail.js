Template.courseDetails.events({

  'click #add-module': function() {

  	// Module
  	module = {
  	  name: $('#module-name').val(),
  	  order: parseFloat($('#module-order').val()),
  	  courseId: this._id
  	}

    if ($('#products').val() != null) {
      module.products = $('#products').val();
    }

  	// Add
  	Meteor.call('addModule', module);
  },
  'click #add-resource': function() {

    // Module
    resource = {
      name: $('#resource-name').val(),
      url: $('#resource-url').val(),
      type: $('#resource-type :selected').val(),
      courseId: this._id
    };

    // Add
    Meteor.call('addResource', resource);
  }

});

Template.courseDetails.helpers({

  modules: function() {
  	return Session.get('allowedModules');
  },
  resources: function() {
    return Resources.find({courseId: this._id, moduleId: {$exists: false}});
  },
  areResources: function() {
    if (Resources.find({courseId: this._id, moduleId: {$exists: false}}).fetch().length == 0) {
      return false;
    }
    else {
      return true;
    }
  }

});

Template.courseDetails.rendered = function() {

  // Get course ID
  var courseId = this.data._id;

  Tracker.autorun(function () {

    // Init picker
    $('#products').selectpicker();

    // Fill picker
    Meteor.call('getProducts', function(err, products) {

      for (i = 0; i < products.length; i++) {
        $('#products').append($('<option>', {
          value: products[i]._id,
          text: products[i].name
        }));
      }

      // Refresh picker
      $('#products').selectpicker('refresh');

    });

    var user = Meteor.user();
    var modules = Modules.find({courseId: courseId}, {sort: {order: 1}}).fetch();

    // Get right modules
    if (user.emails[0].address == 'marcolivier.schwartz@gmail.com') {
      Session.set('allowedModules', modules);
    }
    else {

      Meteor.call('getAllowedModules', user._id, courseId, function(err, modules) {
        Session.set('allowedModules', modules);
      }); 

    }

  });

}