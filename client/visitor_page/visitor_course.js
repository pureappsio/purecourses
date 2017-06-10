Template.visitorCourse.helpers({

    url: function() {

        if (this.imgUrl) {
            return this.imgUrl;
        }
        if (this.imgId) {
            console.log(Files.findOne(this.imgId));
            return Files.findOne(this.imgId).link();
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
