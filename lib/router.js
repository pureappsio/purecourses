Router.configure({
    layoutTemplate: 'layout'
});

Router.onBeforeAction(function() {

    // Set title
    Meteor.call('getTitle', function(err, title) {
        DocHead.setTitle(title);
    });

    // Set icon
    if (Metas.findOne({ type: 'icon' })) {
        var icon = Metas.findOne({ type: 'icon' }).value;
        var linkInfo = { rel: "icon", type: "image/png", href: icon };
        DocHead.addLink(linkInfo);
    }

    this.next();
});

// Main route
Router.route('/', { name: 'home' });
Router.route('/admin', { name: 'admin' });
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
