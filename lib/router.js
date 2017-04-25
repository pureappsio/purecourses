Router.configure({
    layoutTemplate: 'layout'
});

Router.onBeforeAction(function() {

    // Get domain
    if (typeof document !== 'undefined') {

        if (this.params.query.preview) {
            Session.set('preview', true);
        } else {
            Session.set('preview', false);
        }

        var hostnameArray = document.location.hostname.split(".");

        if (hostnameArray.length == 3) {

            var domain = hostnameArray[0];

            if (domain == 'app' && !Session.get('preview')) {
                var domain = "admin"
                Session.set('appMode', true);
                console.log('App mode');
            }

        } else {
            var domain = "admin"
        }

        Meteor.call('getUserDomain', domain, function(err, user) {

            var userId = user._id;
            Session.set('teacherId', userId);

            // console.log(userId);
            console.log(Meteor.users.findOne(user));

            // Set title
            Meteor.call('getTitle', userId, function(err, title) {
                DocHead.setTitle(title);
                Session.set("title", title);
            });

            // Set language
            Meteor.call('getLanguage', userId, function(err, language) {
                Session.set("language", language);
            });

            // Set icon
            if (Metas.findOne({ type: 'icon', userId: userId })) {
                var icon = Metas.findOne({ type: 'icon', userId: userId }).value;
                var linkInfo = { rel: "icon", type: "image/png", href: icon };
                DocHead.addLink(linkInfo);
            } else {
                var linkInfo = { rel: "icon", type: "image/png", href: '/favicon.png?v=2' };
                DocHead.addLink(linkInfo);
            }

        });

    }

    this.next();

});

// Main route
Router.route('/', {
    name: 'home',
    data: function() {

        if (Session.get('preview')) {

            if (Session.get('preview') == true) {
                this.render('home');
            } else {
                this.render('login');
            }

        } else {
            if (!Meteor.userId()) {

                this.render('login');

            } else {

                this.render('home');

            }
        }

    }
});

Router.route('/admin', { name: 'admin' });

Router.route('/login', { name: 'login' });
Router.route('/signup', { name: 'signup' });
Router.route('/domain', { name: 'domainSelect' });

Router.route('/settings', { name: 'settings' });

Router.route('/message', { name: 'message' });

// Coursess
Router.route('/courses/:_id', {
    name: 'courseDetails',
    data: function() {
        return Courses.findOne(this.params._id);
    }
});

Router.route('/courses/edit/:_id', {
    name: 'editCourse',
    data: function() {
        return Courses.findOne(this.params._id);
    }
});

// Modules
Router.route('/modules/:_id', {
    name: 'moduleDetails',
    data: function() {
        return Modules.findOne(this.params._id);
    }
});

Router.route('/modules/edit/:_id', {
    name: 'editModule',
    data: function() {
        return Modules.findOne(this.params._id);
    }
});

// Lessons
Router.route('/lessons/:_id', {
    name: 'lessonDetails',
    data: function() {
        return Lessons.findOne(this.params._id);
    }
});

// Elements
Router.route('/elements/:_id', {
    name: 'elementEdit',
    waitOn: function() {
        return [Meteor.subscribe('userLessons'), Meteor.subscribe('userElements'), Meteor.subscribe('allFiles')];
    },
    data: function() {
        if (this.ready()) {
            this.render('elementEdit', { data: Elements.findOne(this.params._id) });

        } else {
            this.render('loading');
        }
    }
});
