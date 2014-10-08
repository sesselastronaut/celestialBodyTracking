//TODO: display earth_distance
(function() {

	// initialising and setting the global audio context
	window.audioContext = window.audioContext || new AudioContext(); //audio context

	// enter point (only when the DOM is ready)
	window.addEventListener('DOMContentLoaded', init);

	// enable vibration support
	navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

	if (navigator.vibrate) {
		// vibration API supported
		navigator.vibrate([500, 300, 100]);
	}

	var firstalphacatched = false; //catch first alpha on Android platform to avoid compass struggles
	var azimuth = -9999;
	var elevation = -9999;
	var targetAzimuth = -9999;
	var targetElevation = -9999;

	var osc;
	var gainNode;
	var modulator;
	var gainNodeModulator;
	var basefrequency = 800;

	//debug
	function debug(string) {
		document.getElementById("debug").innerHTML = string;
	}

	function displayCelestialBody(string) {
		document.getElementById("celestialbody").innerHTML = string;
	}
	
	function displayTargetAzimuth(string) {
		document.getElementById("targetAzimuth").innerHTML = string + " /";
	}

	function displayTargetElevation(string) {
		document.getElementById("targetElevation").innerHTML = string;
	}

	function displayDistance(string) {
		document.getElementById("earthDistance").innerHTML = string;
	}

	// enter point (only when the DOM is ready)
	window.addEventListener('DOMContentLoaded', init, false);


	function playSound(duration, volume) {
		if (duration > 25) {
			duration = 0.00001;
			oscillator.frequency.value = basefrequency + 200;
			if (navigator.vibrate) {
				// vibration API supported
				navigator.vibrate(10000);
			}
		} else {
			oscillator.frequency.value = basefrequency;
			if (navigator.vibrate) {
				navigator.vibrate(0);
			}
		}
		gainNodeModulator.gain.value = volume * volume;
		modulator.frequency.value = duration;
		// debug(duration);
	}


	function startOscillatorNodes() {
		oscillator = audioContext.createOscillator();
		oscillator.frequency.value = 800;
		gainNode = audioContext.createGain();
		gainNode.gain.value = 0;
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		oscillator.start(0);

		modulator = audioContext.createOscillator();
		modulator.type = 'square';
		modulator.frequency.value = 0;
		//mod.connect(gainNode.gain);

		gainNodeModulator = audioContext.createGain();
		modulator.connect(gainNodeModulator);
		gainNodeModulator.connect(gainNode.gain);
		gainNodeModulator.gain.value = 0;
		modulator.start(0);
	}


	function wrapAngle(x)	{									// ---WRAP EULER ANGLES (-pi <= a <= pi)
		x = x * 0.017453292519943295;							// degrees to radians
		var p360 = Math.PI*2;									// 360 grad in radians
		var f = x - (p360)*Math.floor((x+Math.PI)/p360);		// die funktion
		return f * 57.29578049;									// wieder zu degrees umwandeln
	}

	function calculateDistance() {
		var diffAzimuth = wrapAngle(targetAzimuth - azimuth);
		var diffElevation = targetElevation - elevation;
		var distance = Math.sqrt(diffElevation * diffElevation + diffAzimuth * diffAzimuth);
		// debug(Math.floor(dist * 1000)/1000);
		var duration = 1000/(distance * 20);
		var volume = (1 - distance/254);
		playSound(duration, volume);
		// debug(distance);
	}

	function deviceMotionHandler(event) {
		var acc = {
			x: event.accelerationIncludingGravity.x,
			y: event.accelerationIncludingGravity.y,
			z: event.accelerationIncludingGravity.z
		};

		cosima.unify.acc(acc);

		var roll = -2 * Math.atan(acc.x / Math.sqrt(acc.y * acc.y + acc.z * acc.z)) / Math.PI;
		var pitch = -2 * Math.atan(acc.y / Math.sqrt(acc.z * acc.z + acc.x * acc.x)) / Math.PI;
		var cutoffNorm = 0.5 * (1 - pitch);
		elevation = Math.floor(pitch * 180 * - 10000) / 10000; //cutoffNorm;
		document.getElementById("elevation").innerHTML = elevation;
		// document.getElementById("roll").innerHTML = roll;
	}

	function deviceOrientationHandler(event) {
		azimuth = event.alpha; // in degrees with values ranging from 0 to 360.
		// 	if (this.platform === 2 && !firstalphacatched){ //catch first alpha to avoid troubles with alpha on Android
		// 	firstalpha = alpha;
		// 	firstalphacatched = true;
		// 	console.log('firstalphacatched:', firstalpha);
		// }
		var beta = event.beta;
		var gamma = event.gamma;
		document.getElementById("azimuth").innerHTML = Math.floor(azimuth * 10000) / 10000;
		calculateDistance();
	}

	function checkForMotion(){
		if (window.DeviceMotionEvent) {
			window.addEventListener('devicemotion', deviceMotionHandler, false);
			window.addEventListener('deviceorientation', deviceOrientationHandler, true); //maybe false?
		}
	}

	function getOrbitaldata(data) {
		displayCelestialBody(data.body);
		displayTargetAzimuth(targetAzimuth);
		displayTargetElevation(targetElevation);
		targetAzimuth = Math.floor(data.azimuth * 10000) / 10000;
		targetElevation = Math.floor(data.elevation * 10000) / 10000;
		displayDistance(Math.floor(data.distance * 10000) / 10000);
	}

	function updateJson() {
		setInterval(function() {
			$.ajax({	//$.getJSON(
				url: 'data.json?' + new Date(),
				dataType: "json",
				success: function(data) {
					getOrbitaldata(data);
				}
			});
		}, 1);
	}

	//check the plattform and init the sound system
	function init() {
		updateJson();
		//check plattform
		if (platform.os.family == "iOS")
			this.platform = 1;
		else if (platform.os.family == "Android")
			this.platform = 2;
		// console.log('platform:', this.platform);

		//check event on screen 
		if (this.platform == 2){
			// alert("android: ");
			document.querySelector('.overlay').className = 'overlay hidden';
		}

		document.querySelector('.overlay').addEventListener('click', function() {
			startWebAudioAPI();
			this.className = 'overlay hidden';
		});
		
		// debug('_end-of-init_');
		checkForMotion();
		startOscillatorNodes();
	}

	//event start buttoni to turn up volume on iOS devices
	function startWebAudioAPI() {
		var osc = audioContext.createOscillator();
		var gain = audioContext.createGain();
		gain.gain.value = 0;
		osc.connect(gain);
		gain.connect(audioContext.destination);
		osc.start(0);
		osc.stop(audioContext.currentTime + 0.1);
		gain.disconnect(audioContext.destination);
	}

})();