Template.admin.rendered = function() {

    // Get all users
    Meteor.call('getAllUsers', function(err, users) {
        console.log(users);

        Session.set('users', users);

        // Fill users
        for (i = 0; i < users.length; i++) {
            $('#users').append($('<option>', {
                value: users[i]._id,
                text: users[i].emails[0].address
            }));
        }
    });

    // // Fill picker
    // Meteor.call('getProducts', function(err, products) {

    //     for (i = 0; i < products.length; i++) {
    //         $('#products').append($('<option>', {
    //             value: products[i]._id,
    //             text: products[i].name
    //         }));
    //     }

    //     for (i = 0; i < products.length; i++) {
    //         $('#accounts-products').append($('<option>', {
    //             value: products[i]._id,
    //             text: products[i].name
    //         }));
    //     }

    //     for (i = 0; i < products.length; i++) {
    //         $('#all-products').append($('<option>', {
    //             value: products[i]._id,
    //             text: products[i].name
    //         }));
    //     }

    // });

}

Template.admin.events({

    'click #add-integration': function() {

        var accountData = {
            type: $('#integration-type :selected').val(),
            key: $('#integration-key').val(),
            url: $('#integration-url').val(),
            userId: Meteor.user()._id
        };
        Meteor.call('addIntegration', accountData);

    },

    'click #generate-key': function() {

        Meteor.call('generateApiKey');

    },

    'click #set-theme': function() {

        Meteor.call('insertMeta', { value: $('#theme :selected').val(), type: 'theme' })

    },

    // 'click #reset-edd': function() {

    //   // Reset
    //   Meteor.call('resetProducts');

    // },
    'click #set-title': function() {

        // Reset
        Meteor.call('setTitle', $('#new-title').val());

    },
    'click #set-icon': function() {

        // Reset
        Meteor.call('insertMeta', { value: $('#new-icon').val(), type: 'icon' });

    },
    'click #set-user-data': function() {

        // Reset
        Meteor.call('setUserData', $('#user-name').val(), $('#user-email').val());

    },
    'click #assign-course': function() {

        // Refresh
        Meteor.call('assignCourse', $('#users :selected').val(), $('#courses :selected').val());

    },
    // 'click #assign-product-all': function() {

    //     // Assign
    //     Meteor.call('assignProductAll', $('#all-products').val());

    // },
    'click #set-language': function() {

        // Refresh
        Meteor.call('setLanguage', $('#language').val());

    },
    'click #create-accounts': function() {

        // Refresh
        Meteor.call('createAccounts', $('#password').val());
    }

});

Template.admin.helpers({
    key: function() {
        return Meteor.user().apiKey;
    },
    users: function() {
        return Meteor.users.find({});
    },
    integrations: function() {
        return Integrations.find({});
    },
    userEmail: function() {
        return Meteor.user().contactEmail;
    },
    userName: function() {
        return Meteor.user().userName;
    },
    courses: function() {
        return Courses.find({});
    }
});
