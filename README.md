This is the documentation of a workshop at Gaité Lyrique

Find the description and the link to the origial notepad page on www.malaupixel.org:
    http://rybn.dyndns.org/malaupixel/2012/index.php

-------------------
Start the application

0. Go to the folder with the files

1. Start script whatever you're fancy
>>>> python CelestialBody-tracking.py

2. Start server
python 2.x : python -m SimpleHTTPServer
python 3.x : python -m http.server

Server Framework:
http://hasa-labs.org/workshopping/server.zip
http://hasa-labs.org/workshopping/cosima.zip
http://hasa-labs.org/workshopping/animbar1.gif

3. Get IP adress of your computer
e.g.  ifconfig(Linux,OSX), ipconfig(windows)

4. Point your mobile device connected in the same network to the IP address + the port (8000)
e.g. http://192.168.48.137:8000/

-----------------------------   
Databases/Catalogues
	* Catalogs-overview http://rhodesmill.org/pyephem/catalogs
	* Jpl Solar System Dynamics http://ssd.jpl.nasa.gov/
	* REAL TIME SATELLITE TRACKING AND PREDICTIONS http://www.n2yo.com/
	* Heavens Above http://www.heavens-above.com/
	* CalSky http://www.calsky.com/
	* Celestrak http://celestrak.com/
	* Galaxy Map : http://galaxymap.org/index.html 
	* Cnes database http://kalideos.cnes.fr/spip.php?rubrique3
	* Some other resources : https://en.wikipedia.org/wiki/Space_debris#External_links

-----------------------------   
Categories for celestial bodies:
--Sun
	* Brilliant Noise & Black Rain by Semiconductor: a short film about solar activities. They work with the raw satellite date/imagery.
	* http://semiconductorfilms.com/art/brilliant-noise/
	* http://semiconductorfilms.com/art/black-rain/

--Planets
	* Jupiter - bringer of exuberance – stabilizes the whole asteroid belt with his mass.
	* Saturn - the bringer of the old times – his waist-belt demands eternal loyalty and love to the arts.
	* Venus - bringer of peace, after the moon the brightest natural object on the firmament.
	* Exoplanet Hat P 11 b (or Kepler 3b) : recently discovered and smallest exoplanet. In the Cygnus constellation http://exoplanets.org/detail/HAT-P-11


--Earth's moon
	* ISS - In construction since 1998 at the moment the biggest artificial object in earth's orbit.
	* Moon - the only natural earth-satellite - decides every day how to appear differently - a real fashion victim.

--Space debris
	* KOSMOS 1818 - Spy satellite - shot into orbit from the russiona Baikonur Cosmodomevon in 1987 - kind of a flying Tschernobyl http://www.n2yo.com/satellite/?s=17369
	* Cosmos 382 - With his mass of 10 tons the largest non-military piece of space junk
	* Vanguard 1 - First solardriven Satellite. Shot in space by the US Navy in 1958. The oldest object still in orbit.


--Space Probes
	* Hubble
	* Voyagers
	Voyager 2 Flyby of Saturn animation from 1981 (by Jim Blinn) - one of the first 3d animation that showed the public of the movements of the satellites.
	https://www.youtube.com/watch?v=SQk7AFe13CY

	Interesting facts:
	
	"Golden record:
	Voyager Golden Record Each Voyager space probe carries a gold-plated audio-visual disc in the event that the spacecraft is ever found by intelligent life forms from other planetary systems.
	The disc carries photos of the Earth and its lifeforms, a range of scientific information, spoken greetings from people such as the Secretary-General of the United Nations and the President of the United States and a medley, "Sounds of Earth," that includes the sounds of whales, a baby crying, waves breaking on a shore, and a collection of music, including works by Mozart, Blind Willie Johnson, Chuck Berry's "Johnny B. Goode", and Valya Balkanska.
	Other Eastern and Western classics are included, as well as various performances of indigenous music from around the world. The record also contains greetings in 55 different languages.21"
	
	Did they add a player for such record? or did they assume that the aliens would have a record player?
	
	Links:
		* Voyager 1 Golden Record: https://www.youtube.com/watch?v=ELnn9V01EiI
		* The Golden Record: Greeting to space from the Secretary General of the UN: http://bit.ly/1vjJVoP
		* Golden record cover: http://bit.ly/1u51Krf
		* Goden record's original tracklinst: http://voyager.jpl.nasa.gov/spacecraft/music.html
		* Wikipedia page for the golden record: https://en.wikipedia.org/wiki/Voyager_Golden_Record
		* Nasa's home page for the data: http://voyager.jpl.nasa.gov/science/Voyager_Science_Data.html
		* Trajectory: http://web.mit.edu/afs/athena/org/s/space/www/voyager/voyager_traj/traj.gif

	* Encelade satellite
	http://en.wikipedia.org/wiki/Enceladus
	http://www.space.com/25340-saturn-moon-enceladus-ocean-discovery.html
	http://solarsystem.nasa.gov/planets/profile.cfm?Object=Enceladus

--Stars
	* Polaris
	Polaris (commonly North Star, Northern Star or Pole Star) is the brightest star in the constellation Ursa Minor, and the 45th brightest star in the night sky. It is very close to the north celestial pole, making it the current northern pole star.

--Constellations
	* Cassiopeia
	* Southerncross
	* Orion

--Asteroids

	* Eros : asteroid named after the Greek god of love and discovered in 1898. One of the larger near-Earth asteroids (NEAs). http://en.wikipedia.org/wiki/433_Eros ; http://fr.wikipedia.org/wiki/(433)_%C3%89ros

--Comets
	* 67P/Churyumov-Gerasimenko
	* C/2013 A1 (Siding Spring)"

--Galaxies
	* M31 aka Andromeda
	http://space-facts.com/andromeda/ "In approximately 4.5 billion years the Andromeda Galaxy and the Milky Way are expected to collide."
	http://www.imdb.com/title/tt0213327/ // https://en.wikipedia.org/wiki/The_Andromeda_Strain_%28film%29 

-----------------------------
Technical stuff
list of available celestial objects in pyephem on this site:
http://oneau.wordpress.com/2010/07/04/astrometry-in-python-with-pyephem/#planets-and-their-major-moons

- installing pip (osx): http://pip.readthedocs.org/en/latest/installing.html
- how to install pyephem: pip install pyephem
- python installer for windows - https://www.python.org/download/windows/
- pyephem for windows http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyephem

OSX : 
    https://www.python.org/download/releases/3.2.5/ (maybe available for osx 10.3 & > )
    
Compass:                               
test availability https://developer.mozilla.org/en-US/demos/detail/simple-compass/launch
    
