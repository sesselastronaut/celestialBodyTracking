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


#### read orbital element
# find an overview of catalogues here:
# http://rhodesmill.org/pyephem/catalogs
celestialBody = ephem.readdb("C/2013 A1 (Siding Spring),h,10/25.3021/2014,129.0439,300.9764,2.4233,1.000749,1.398713,2000,8.2,2.4")


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
