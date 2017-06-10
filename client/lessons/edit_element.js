Template.elementEdit.events({

    'click #save-element': function() {

        var element = {
            _id: this._id,
            lessonId: this.lessonId,
            userId: Meteor.user()._id
        };

        if (this.text) {

            element.text = CKEDITOR.instances['element-text'].getData();

        }
        if (this.videoId) {

            if (Session.get('elementFile')) {
                element.videoId = Session.get('elementFile');
            }

        }
        if (this.pictureId) {

            if (Session.get('elementFile')) {
                element.pictureId = Session.get('elementFile');
            }

        }

        Meteor.call('editElement', element, function(err, data) {
            Session.set('elementFile', null);
            Router.go('/lessons/' + element.lessonId);
        });

    }

});

Template.elementEdit.helpers({

    newFile: function() {

        if (Session.get('elementFile')) {
            return Files.findOne(Session.get('elementFile')).name;
        }

    },
    fileName: function() {
        if (this.videoId) {
            return Files.findOne(this.videoId).name;
        }
        if (this.pictureId) {
            return Files.findOne(this.pictureId).name;
        }
    },

    videoUrl: function() {
        if (this.url) {
            return this.url;
        }
        if (this.videoId) {
            return Files.findOne(this.videoId).link();
        }
    },
    imgUrl: function() {

        if (this.pictureId) {
            console.log(Files.findOne(this.pictureId));
            return Files.findOne(this.pictureId).link();
        }

    },
    isPicture: function() {

        if (this.pictureId) {
            return true;
        }

    },
    isAudio: function() {

        if (this.videoId) {
            var file = Files.findOne(this.videoId);
            if (file.ext == 'mp3' || file.ext == 'wav' || file.ext == 'ogg') {
                return true;
            }
        }

    },
    audioUrl: function() {

        if (this.videoId) {
            return Files.findOne(this.videoId).link();
        }

    },
    isText: function() {
        if (this.text) {
            return true;
        }
    },
    isVideo: function() {
        if (this.url) {
            return true;
        } else if (this.videoId) {
            var file = Files.findOne(this.videoId);
            if (file.ext == 'mp4' || file.ext == 'mov' || file.ext == 'avi') {
                return true;
            }
        }
    }

});

Template.elementEdit.onRendered(function() {

    if (this.data) {
        if (this.data.text) {
            CKEDITOR.replace('element-text', {
                extraPlugins: 'justify,image2'
            });
            CKEDITOR.instances['element-text'].setData(this.data.text);
        }

    }
});
