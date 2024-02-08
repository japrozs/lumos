import geopy
import time
import json
from geopy.geocoders import Nominatim

f = open("processed-data.json", "r")

data = json.load(f)

def latlon_to_address(lat, lon):
    geolocator = Nominatim(user_agent="my-app")
    location = geolocator.reverse((lat, lon))
    if location:
        return location.raw['display_name']
    else:
        return None


for i in range(len(data['entities'])):
	college = data['entities'][i]
	if 'centroid' in college['content']:
		if 'lat' in college['content']['centroid']:
			# data['entities'][i]['content']['entity']['address']
			lat = college['content']['centroid']['lat']
			lon = college['content']['centroid']['lon']
			address = latlon_to_address(lat, lon)
			print('address : ', address)
			data['entities'][i]['content']['address'] = address
			time.sleep(0.5)
                  
json_data = json.dumps(data, indent = 4)
with open("processed-data-address.json", "w") as file:
      file.write(json_data)
      
                  

# latitude = 41.310725
# longitude = -72.9261294

# address = latlon_to_address(latitude, longitude)
# print(address)