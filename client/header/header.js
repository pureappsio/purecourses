Template.header.events({

    'click #log-out': function() {
        Meteor.logout();
    }

});

Template.header.helpers({

    title: function() {
        return Session.get('title');
    }

});

Template.header.rendered = function() {

    // Meteor.call('getTitle', function(err, data) {
    //     Session.set('title', data);
    // });

    // Meteor.call('checkLanguage', function(err, data) {
    //     console.log(data);
    // accountsUIBootstrap3.setLanguage(Session.get('language'));
    // });

}
