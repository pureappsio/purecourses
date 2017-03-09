Template.editModule.rendered = function() {

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

};

Template.editModule.events({

    'click #edit-module': function() {

        // Module
        module = {
            name: $('#module-name').val(),
            order: parseFloat($('#module-order').val()),
            courseId: this.courseId,
            _id: this._id,
            userId: Meteor.user()._id
        }

        if ($('#products').val() != null) {
            module.products = $('#products').val();
        }

        // Add
        Meteor.call('editModule', module);
    }

});
