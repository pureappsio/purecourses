Template.course.events({

    

});

Template.course.helpers({

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
