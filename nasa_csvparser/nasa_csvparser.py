# -*- coding: utf-8 -*-
import datetime
import os
#import codecs
import subprocess
import datetime
import sys
#import time
from utils import strptime
import pytz


def get_position(file):

    # nasa_csv is utc time
    now = datetime.datetime.now(pytz.utc)
    now = now.strftime("%Y-%h-%d %H:%M")
    line = subprocess.check_output("grep " + "'" + now + "' " + file, shell=True)
    line = line.split(",")
    line = {"date" : now, "azi"  : line[3], "elev" : line[4], "delta" : line[5], "deldot" : line[6]}

    return line



"""Returns a json version of the NASA CSV
for today and tommorow

{
    "20121213010": {
        "date": "2012-Dec-13 00:10",
        "azi": "17.4685",
        "deldot": "14.0385607",
        "elev": "-28.4912",
        "delta": "1.8471881842E+10"
    },
    "2012121300": {
        "date": "2012-Dec-13 00:00",
        "azi": "14.7059",
        "deldot": "14.0546404",
        "elev": "-28.9617",
        "delta": "1.8471873415E+10"
    },
}
"""

def get_positions_today_json(file):

    today = datetime.datetime.now()
    today = today.strftime("%Y-%h-%d")

    tomorrow = datetime.datetime.today() + datetime.timedelta(days=1)
    tomorrow = tomorrow.strftime("%Y-%h-%d")

    lines_today = subprocess.check_output("grep " + "'" + today + "' "+file, shell=True)
    lines_tomorrow = subprocess.check_output("grep " + "'" + today + "' "+file, shell=True)
    lines = lines_today + lines_tomorrow
    lines = lines.split("\n")

    json_export = {}
    i = 0

    for line in lines:
        line = line.split(",")
        line = map(lambda l: l.strip(), line)

        if len(line) < 5:
            continue
        line = map(lambda l: l.strip(), line)
        line = {"date" : line[0], "azi"  : line[3], "elev" : line[4], "delta" : line[5], "deldot" : line[6]}
        date_json = strptime(line["date"], "%Y-%h-%d %H:%M")
        date_json = str(date_json[0]) + str(date_json[1]) + str(date_json[2]) + str(date_json[3]) + str(date_json[4])
        json_export.update({int(date_json):line})

    import json
    return json.dumps(json_export)


if __name__ == '__main__':

    if len(sys.argv) < 2:
        sys.exit('Usage: %s nasa-csv-file' % sys.argv[0])

    if not os.path.exists(sys.argv[1]):
        sys.exit('ERROR: NASA CSV File %s was not found!' % sys.argv[1])

    file = sys.argv[1]
    today_json = get_position(file)
    print today_json
