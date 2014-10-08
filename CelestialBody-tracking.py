import time, math, ephem
from datetime import datetime
from json import dumps, load

degrees_per_radian = 180.0 / math.pi


#### set Observer 
#observer = ephem.Observer()
#observer.lon = '-122.63'   # +E
#observer.lat = '45.56'      # +N
#observer.elevation = 80 # meters
observer = ephem.city('London')


#### set Celestial Body
# for a list of bodies check: 
# http://oneau.wordpress.com/2010/07/04/astrometry-in-python-with-pyephem/#body
celestialBody = ephem.Pluto()


#### compute position of Celestial Body relative to Observer
while True:
	observer.date = datetime.utcnow()
	celestialBody.compute(observer)
	elevationPosition = celestialBody.alt * degrees_per_radian
	azimuthPosition = celestialBody.az * degrees_per_radian
	print ('%s position, measured from %s: azimuth: %s; elevation: %s; distance: %s;' % (celestialBody.name,observer.name,  azimuthPosition, elevationPosition, celestialBody.earth_distance)) 

	with open("data.json", "w") as file:
		file.write(dumps({'body':celestialBody.name, 'azimuth':azimuthPosition, 'elevation':elevationPosition, 'distance':celestialBody.earth_distance}, file, indent=4))
			
	print ('Writing JSON file:')    
	with open("data.json", "r") as file:
		print(file.read())
			
	time.sleep(1.0)

