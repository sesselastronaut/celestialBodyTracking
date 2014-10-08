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
# NORAD Two-Line Element Sets
# http://celestrak.com/NORAD/elements/
celestialBody = ephem.readtle('APRIZESAT 2',
	'1 28366U 04025A   14271.35446003  .00000272  00000-0  10088-3 0  8693',
	'2 28366  98.3090 201.2758 0109272 140.4396 220.4831 14.36260423537050'
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
