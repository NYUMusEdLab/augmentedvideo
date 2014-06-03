INST.AUDIO = function(){

	//init
	function init(){
		//setup sound manager
		soundManager.setup({
			url: 'http://www.makeymakey.com/instScripts/deps/swf/',
			preferFlash: true,
			useHighPerformance : true,
			html5PollingInterval : 25,
			flashPollingInterval : 25,
			onready: function() {
				//load the audio
				if (soundManager.hasHTML5){
					console.log("using HTML5 audio");
				} else {
					console.log("using flash audio");
				}
				INST.initialize();
			},
			ontimeout : function(){
				alert('Audio failed to start. Flash is missing or blocked. Try refreshing your this page or switching to another browser. If the problem persists please email support@joylabz.com');
			}
		});
		console.log("using sound manager");
	}

	return {
		initialize : init
	}
}();


/*
	plays the audio
*/
INST.PLAYER = function(key){
	//make the sound object
	var audioFile = KEYMAP[key.id].audio;
	this.sound = soundManager.createSound({
		id: key.id,
		url: ['./media/'+audioFile+'.mp3', './'+audioFile+'.ogg', './'+audioFile+'.wav'],
		onload : function(){
			INST.loadResolved();	
		},
		autoLoad : true,
		onfinish : $.proxy(key.endNote, key)
	});
}

//play the note
INST.PLAYER.prototype.startNote = function(){
	this.sound.play();
}