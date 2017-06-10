Template.header.events({

    'click #log-out': function() {
        Meteor.logout();
    }

});

Template.header.helpers({

    title: function() {
        return Session.get('title');
    },
    notUser: function() {
        if (!Meteor.user()) {
            return true;
        }
    },
    langEN: function() {

        if (Metas.findOne({ type: 'language', userId: Session.get('teacherId') })) {

            var language = Metas.findOne({ type: 'language', userId: Session.get('teacherId') }).value;

            if (language == 'fr') {
                return false;
            } else {
                return true;
            }

        } else {
            return true;
        }

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
