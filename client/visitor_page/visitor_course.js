Template.visitorCourse.helpers({

    url: function() {

        if (this.imgUrl) {
            return this.imgUrl;
        }
        if (this.imgId) {
            console.log(Files.findOne(this.imgId));
            return Files.findOne(this.imgId).link();
        }

    },
    pricing: function() {

        if (this.access == 'free') {
            return 'FREE';
        }

        else if (Session.get('coursesProducts')) {
            if (Session.get('coursesProducts')[this._id]) {
                return '$' + Session.get('coursesProducts')[this._id].price;
            }
        }
    }

});

Template.visitorCourse.events({

    'click .visitor-course': function() {
        if (this.salesPage) {
            window.location.href = this.salesPage;
        } else {
            Router.go('signup');
        }
    }

});

Template.visitorCourse.onRendered(function() {

    // if (this.data) {

    //     var courseId = this.data._id;

    //     Meteor.call('getCoursePrice', courseId, function(err, data) {

    //         Session.set('pricing' + courseId, data);

    //     });

    // }

});
