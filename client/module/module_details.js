Template.moduleDetails.events({

    'click #add-lesson': function() {

        // Module
        lesson = {
            name: $('#lesson-name').val(),
            moduleId: this._id,
            courseId: this.courseId,
            userId: Meteor.user()._id
        };
        
        // Add
        Meteor.call('addLesson', lesson, function(err, data) {
            if (!err) {
                $('#lesson-added').show();
                $('#lesson-added').fadeOut(2000);
            }
        });
    },
    'click #add-resource': function() {

        // Module
        resource = {
            name: $('#resource-name').val(),
            url: $('#resource-url').val(),
            type: $('#resource-type :selected').val(),
            moduleId: this._id,
            courseId: this.courseId,
            userId: Meteor.user()._id
        };

        // Add
        Meteor.call('addResource', resource, function(err, data) {
            if (!err) {
                $('#resource-added').show();
                $('#resource-added').fadeOut(2000);
            }
        });
    }

});

Template.moduleDetails.helpers({

    lessons: function() {
        return Lessons.find({ moduleId: this._id }, { sort: { order: 1 } });
    },
    resources: function() {
        return Resources.find({ moduleId: this._id });
    },
    areResources: function() {
        if (Resources.find({ moduleId: this._id }).fetch().length == 0) {
            return false;
        } else {
            return true;
        }
    }

});

Template.moduleDetails.onRendered(function() {

    // // Init editor
    // CKEDITOR.replace('lesson-text', {
    //     extraPlugins: 'uploadimage,uploadwidget'
    // });

});
