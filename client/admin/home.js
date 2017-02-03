Template.home.helpers({

  courses: function() {
  	return Session.get('allowedCourses');
  },
  possibleCourses: function() {
    return Session.get('possibleCourses');
  },
  // products: function() {
  // 	return Products.find({});
  // },
  // title: function() {
  //   return Session.get('coursesTitle');
  // }

});

Template.home.rendered = function() {

  Tracker.autorun(function () {

    // Check language
    Meteor.call('checkLanguage', function(err, data) {

      if (data == 'fr') {
        Session.set('coursesTitle', 'Formations');
      }
      else {
        Session.set('coursesTitle', 'Courses');
      }

    });

    // // Init picker
    // $('#products').selectpicker();

    // // Fill picker
    // Meteor.call('getProducts', function(err, products) {

    //   for (i = 0; i < products.length; i++) {
    //     $('#products').append($('<option>', {
    //       value: products[i]._id,
    //       text: products[i].name
    //     }));
    //   }

    //     // Free option
    //     $('#products').append($('<option>', {
    //         value: 'free',
    //         text: 'Free content'
    //     }));

    //   // Refresh picker
    //   $('#products').selectpicker('refresh');

    // });

    var user = Meteor.user();
    var courses = Courses.find({}).fetch();

    // Get right courses
    if (user.emails[0].address == 'marcolivier.schwartz@gmail.com') {
      Session.set('allowedCourses', courses);
    }
    else {

      Meteor.call('getAllowedCourses', user._id, function(err, courses) {
        Session.set('allowedCourses', courses);
      }); 

      Meteor.call('getPossibleCourses', user._id, function(err, courses) {
        Session.set('possibleCourses', courses);
      }); 

    }

  });

};

Template.home.events({

  'click #add-course': function() {

  	// Course
  	course = {
  	  imgUrl: $('#course-img-url').val(),
  	  name: $('#course-name').val(),
  	  access: $('#access :selected').val()
  	}
  	console.log(course);

  	// Add
  	Meteor.call('addCourse', course);
  }

});

