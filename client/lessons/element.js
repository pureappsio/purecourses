Template.element.events({

    'click .delete-element': function() {

        Meteor.call('deleteElement', this._id);

    },
    'click .element-plus': function() {

        Meteor.call('changeElementOrder', this._id, 1);

    },
    'click .element-minus': function() {

        Meteor.call('changeElementOrder', this._id, -1);

    }

});

Template.element.helpers({

    videoUrl: function() {
        if (this.url) {
            return this.url;
        }
        if (this.videoId) {
            return Session.get('videoLink' + this._id);
        }
    },
    imgUrl: function() {

        if (this.pictureId) {
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

Template.element.onRendered(function() {

    if (this.data) {

        if (this.data.videoId) {

            var videoId = this.data.videoId;

            Meteor.call('getFileLink', videoId, function(err, data) {

                Session.set('videoLink' + videoId, data);

            });
        }

        if (videojs.getPlayers()['lesson-video-' + this.data._id]) {
            delete videojs.getPlayers()['lesson-video-' + this.data._id];
        }

        // Url
        var videoUrl = this.data.url;

        videojs("lesson-video-" + this.data._id, {}, function() {

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
