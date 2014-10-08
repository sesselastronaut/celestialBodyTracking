#TODO keyboardinterrupt
import time, math, ephem
from datetime import datetime
from json import dumps, load
 
degrees_per_radian = 180.0 / math.pi

#### set Observer 
#observer = ephem.Observer()
#observer.lon = '-122.63'   # +E
#observer.lat = '45.56'      # +N
#observer.elevation = 80 # meters
observer = ephem.city("Paris")

#### read Two Line Element Data
# Always get the latest ISS TLE data from:
# http://spaceflight.nasa.gov/realdata/sightings/SSapplications/Post/JavaSSOP/orbit/ISS/SVPOST.html
celestialBody = ephem.readtle('ISS',
	'1 25544U 98067A   14265.54968726  .00016717  00000-0  10270-3 0  9002',
	'2 25544  51.6472 337.0187 0001753 121.7667 238.3655 15.50565642 26438'
)
 
#### compute position of Celestial Body relative to Observer
while True:
	observer.date = datetime.utcnow()
	celestialBody.compute(observer)
	elevationPosition = celestialBody.alt * degrees_per_radian
	azimuthPosition = celestialBody.az * degrees_per_radian
	print ('%s position, measured from %s: azimuth: %s; elevation: %s; distance: %s;' % (celestialBody.name, observer.name,  azimuthPosition, elevationPosition, celestialBody.range)) 

	with open("data.json", "w") as file:
		file.write(dumps({'body':celestialBody.name, 'azimuth':azimuthPosition, 'elevation':elevationPosition, 'distance':celestialBody.range}, file, indent=4))
			
	print ('Writing JSON file:')    
	with open("data.json", "r") as file:
		print(file.read())
			
	time.sleep(1.0)
