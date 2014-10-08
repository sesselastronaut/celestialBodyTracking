# -*- coding: utf-8 -*-
from nasa_csvparser.nasa_csvparser import *
from json import dumps, load
import time

# csv file created with: 
# http://ssd.jpl.nasa.gov/horizons.cgi
csvFile = "data/voyager_1.csv"


#### compute position of Celestial Body
while True:
	celestialBody = get_position(csvFile)
	#print celestialBody
	print "Date: " + celestialBody["date"]
	print "AZI: " + celestialBody["azi"]
	print "ELEV: " + celestialBody["elev"]
	
	azPosition = celestialBody["azi"]
	elevPosition = celestialBody["elev"]

	print ('azimuth: %s; elevation: %s' % (azPosition, elevPosition))

	
	with open("data.json", "w") as file:
		file.write(dumps({'body':'Voyager', 'azimuth':azPosition, 'elevation':elevPosition}, file, indent=4))
	
	print ('Writing JSON file:')    
	with open("data.json", "r") as file:
		print(file.read())
				
	time.sleep(1.0)

