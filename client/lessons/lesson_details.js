Template.lessonDetails.events({

    'change #element-type, click #element-type': function() {

        // Get value
        var selection = $('#element-type :selected').val();

        console.log(selection);

        if (selection == 'text') {

            $('#element-text').show();
            $('#element-video').hide();
            $('#element-picture').hide();

            CKEDITOR.replace('lesson-text', {
                extraPlugins: 'justify'
            });

        }
        if (selection == 'video') {

            $('#element-text').hide();
            $('#element-video').show();
            $('#element-picture').hide();

        }
        if (selection == 'picture') {

            $('#element-text').hide();
            $('#element-video').hide();
            $('#element-picture').show();

        }

    },
    'click #add-element': function() {

        // Get value
        var selection = $('#element-type :selected').val();

        var element = {
            lessonId: this._id,
            userId: Meteor.user()._id
        };

        if (selection == 'text') {

            if (CKEDITOR.instances['lesson-text'].getData() != '<p><br></p>') {
                element.text = CKEDITOR.instances['lesson-text'].getData();
            }

            // Clear
            CKEDITOR.instances['lesson-text'].setData('');

        }
        if (selection == 'video') {

            if (Session.get('elementVideo')) {
                element.videoId = Session.get('elementVideo');
            }

        }
        if (selection == 'picture') {

            if (Session.get('elementPicture')) {
                element.pictureId = Session.get('elementPicture');
            }

        }

        Meteor.call('addElement', element, function(err, data) {
            if (!err) {
                $('#element-added').show();
                $('#element-added').fadeOut(2000);
            }
        });

    }

});

Template.lessonDetails.helpers({

    domain: function() {

        if (Meteor.user().role == 'admin') {
            return Meteor.absoluteUrl();
        } else {

            var hostnameArray = document.location.hostname.split(".");

            if (hostnameArray.length == 3) {
                return Meteor.user().domain + '.' + hostnameArray[1] + '.' + hostnameArray[2] + '/';

            } else {
                return Meteor.user().domain + '.' + hostnameArray[0] + '.' + hostnameArray[1] + '/';
            }

        }

    },

    elements: function() {
        return Elements.find({ lessonId: this._id }, { sort: { order: 1 } });
    },

    videoUrl: function() {
        if (this.url) {
            return this.url;
        }
        if (this.videoId) {
            return Files.findOne(this.videoId).link();
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

Template.lessonDetails.onRendered(function() {

    if (this.data) {

        if (videojs.getPlayers()['lesson-video']) {
            delete videojs.getPlayers()['lesson-video'];
        }

        // Url
        var videoUrl = this.data.url;

        videojs("lesson-video", {}, function() {

            var player = this;
            player.load();

        });

    }

});

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
