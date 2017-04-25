Template.signup.events({

    'click #signup': function() {

        if (Session.get('appMode')) {
            var data = {
                email: $('#email').val(),
                password: $('#password').val(),
                role: 'appuser'
            }

        } else {
            var data = {
                email: $('#email').val(),
                password: $('#password').val(),
                role: 'student',
                teacherId: Session.get('teacherId')
            }
        }

        Meteor.call('createUserAccount', data, function(err, data) {

            Meteor.loginWithPassword($('#email').val(), $('#password').val(), function(err, data) {

                if (Session.get('appMode')) {
                    Router.go('/domain');
                } else {
                    Router.go('/');
                }

            });

        });

    }

});
