Template.editCourse.rendered = function() {

    // // Init picker
    // $('#products').selectpicker();

    // // Fill picker
    // Meteor.call('getProducts', function(err, products) {

    //     // All products
    //     for (i = 0; i < products.length; i++) {
    //         $('#products').append($('<option>', {
    //             value: products[i]._id,
    //             text: products[i].name
    //         }));
    //     }

    //     // Free option
    //     $('#products').append($('<option>', {
    //         value: 'free',
    //         text: 'Free content'
    //     }));

    //     // Refresh picker
    //     $('#products').selectpicker('refresh');

    // });

    $('#access').val(this.data.access);

};

Template.editCourse.events({

    'click #edit-course': function() {

        // Course
        course = {
            imgUrl: $('#course-img-url').val(),
            name: $('#course-name').val(),
            access: $('#access :selected').val(),
            _id: this._id,
            salesPage: $('#course-sales-page').val()
        }

        // Add
        Meteor.call('editCourse', course);
    }

});
