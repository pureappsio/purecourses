Template.lessonDetails.onRendered(function() {

    // var oldPlayer = document.getElementById('#lesson-video');
    // videojs(oldPlayer).dispose();



    if (this.data) {

    	if(videojs.getPlayers()['lesson-video']) {
	    delete videojs.getPlayers()['lesson-video'];
	}

  //   	var player = videojs('#lesson-video');
		// player.dispose();

        // Url
        var videoUrl = this.data.url;

        videojs("lesson-video", {}, function() {

            var player = this;
            player.load();

        });
        // videojs("#lesson-video").ready(function() {

        // 	console.log('Loading');
        //     var myPlayer = this;

        //     // myPlayer.src({
        //     //     src: videoUrl,
        //     //     type: 'video/mp4'
        //     // });
        //     myPlayer.load();

        //     // Leaving
        //     $(window).bind('beforeunload', function() {
        //         myPlayer.destroy();
        //     });

        // });
    }

});

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
