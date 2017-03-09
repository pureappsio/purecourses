Template.lessonDetails.helpers({

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
