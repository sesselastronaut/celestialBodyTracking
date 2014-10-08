import ephem, math

degrees_per_radian = 180.0 / math.pi

observer = ephem.city('Paris')

celestialBody = ephem.Moon()

celestialBody.compute(observer)

print ('%s position, measured from %s: azimuth: %s; elevation: %s; distance: %s;' % (celestialBody.name, observer.name, (celestialBody.az * degrees_per_radian), (celestialBody.alt * degrees_per_radian), celestialBody.earth_distance))
