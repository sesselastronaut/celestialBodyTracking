(function() {

	// initialising and setting the global audio context
	window.audioContext = window.audioContext || new AudioContext(); //audio context

	// enter point (only when the DOM is ready)
	window.addEventListener('DOMContentLoaded', init);

	var firstalphacatched = false; //catch first alpha on Android plattform to avoid compass struggles
	var azimuth = -9999;
	var elevation = -9999;
	var targetAzimuth = -9999;
	var targetElevation = -9999;

	var osc;
	var gainNode;
	var mod;

	//debug
	function debug(string) {
		document.getElementById("debug").innerHTML = string;
	}

	function displayCelestialBody(string) {
		document.getElementById("celestialbody").innerHTML = string;
	}
	
	function displayTargetAzimuth(string) {
		document.getElementById("targetAzimuth").innerHTML = string;
	}

	function displayTargetElevation(string) {
		document.getElementById("targetElevation").innerHTML = string;
	}

	function getOrbitaldata(data) {
		displayCelestialBody(data.body);
		targetAzimuth = data.azimuth;
		targetElevation = data.elevation;
		displayTargetAzimuth(targetAzimuth);
		displayTargetElevation(targetElevation);
	}

	function readJson() {
		($.get('data.json', function(data) {
			getOrbitaldata(data);
		}));
	}

	function updateJson() {
		setInterval(function() {
			($.ajax({	//$.getJSON(
				url: 'data.json',
				dataType: "json",
				success: function(data) {
					getOrbitaldata(data);
				}
			}));
		}, 1);
	}

	function deviceMotionHandler(event) {
		var acc = {
			x: event.accelerationIncludingGravity.x,
			y: event.accelerationIncludingGravity.y,
			z: event.accelerationIncludingGravity.z
		};

		// cosima.unify.acc(acc);

		var roll = -2 * Math.atan(acc.x / Math.sqrt(acc.y * acc.y + acc.z * acc.z)) / Math.PI;
		var pitch = -2 * Math.atan(acc.y / Math.sqrt(acc.z * acc.z + acc.x * acc.x)) / Math.PI;
		var cutoffNorm = 0.5 * (1 - pitch);
		elevation = pitch; //cutoffNorm;
		document.getElementById("elevation").innerHTML = elevation;
		// document.getElementById("roll").innerHTML = roll;
	}

	function deviceOrientationHandler(event) {
		azimuth = event.alpha - firstalphacatched; // in degrees with values ranging from 0 to 360.
		/*	if (this.platform === 2 && !firstalphacatched){ //catch first alpha to avoid troubles with alpha on Android
			firstalpha = alpha;
			firstalphacatched = true;
			console.log('firstalphacatched:', firstalpha);
		}*/
		var beta = event.beta;
		var gamma = event.gamma;
		document.getElementById("azimuth").innerHTML = Math.floor(azimuth);
		calculateDistance();
	}

	function calculateDistance() {
		var diffAz = targetAzimuth - azimuth;
		// debug(diffAz);
		var diffEl = targetElevation - elevation;
		var dist = Math.sqrt(diffEl * diffEl + diffAz * diffAz);
		debug(dist);
		var duration = 1000/(diffAz * 20);
		playSound(duration);
	}


	// private float wrapAng(float x)	{          					// ---WRAP EULER ANGLES (-pi <= a <= pi)
	// 	x *= Mathf.Deg2Rad;                    					// degrees zu radians umwandeln
	// 	float p360 = Mathf.PI*2;               					// 360 grad in radians
	// 	float f = x - (p360)*Mathf.Floor((x+Mathf.PI)/p360);	// die funktion
	// 	return f*Mathf.Rad2Deg;              					// wieder zu degrees umwandeln
	// }

	function init() {
		//readJson();
		updateJson();

		// debug(orbitaldata);
		if (window.DeviceMotionEvent) {
			window.addEventListener('devicemotion', deviceMotionHandler, false);
			window.addEventListener('deviceorientation', deviceOrientationHandler, true); //maybe false?
		}

		debug('_end-of-init_');
		// startWebAudioAPI(300);
		startWebAudioAPI();
	}

	//event start buttoni to turn up volume on iOS devices
	function startWebAudioAPI() {
		osc = audioContext.createOscillator();
		osc.frequency.value = 800;
		gainNode = audioContext.createGain();
		gainNode.gain.value = 0;
		osc.connect(gainNode);
		gainNode.connect(audioContext.destination);
		osc.start();

		mod = audioContext.createOscillator();
		mod.type = 'square';
		// mod.frequency.value = 1;
		mod.connect(gainNode.gain);
		mod.start();
	}

	function playSound(duration) {
		gainNode.gain.value = 0.3;
		mod.frequency.value = duration;
		// osc.noteOff(duration);
		// osc.stop(audioContext.currentTime + duration);
		// debug(targetAzimuth - azimuth);
	}
})();