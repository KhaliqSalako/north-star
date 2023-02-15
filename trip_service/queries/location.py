import requests
from .api_keys import Google_APIKey


class LocationQueries:
    def get_location_by_name(self, location_search: str):
        try:
            location_res = requests.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + location_search + '&inputtype=textquery&fields=place_id%2Cphotos%2Cformatted_address%2Cname%2Cgeometry&key=' + Google_APIKey)
            if location_res.status_code == 200:
                location_data = location_res.json()
                location = {}
                location['name'] = location_data['candidates'][0]['name']
                location['geo_location'] = location_data['candidates'][0]['geometry']['location']
                location['formatted_address'] = location_data['candidates'][0]['formatted_address']
                location['photo_reference'] = location_data['candidates'][0]['photos'][0]['photo_reference']
                place_id = location_data['candidates'][0]['place_id']
                details_res = requests.get('https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&fields=editorial_summary&key=' + Google_APIKey)
                if location_res.status_code == 200:
                    details_data = details_res.json()
                    if 'editorial_summary' in details_data['result']:
                        location['details'] = details_data['result']['editorial_summary']['overview']
                        return location
                    else:
                        location['details'] = ''
                        return location
                else:
                    return None
            else:
                return None
        except IndexError:
            return "This location does not exist"


# https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=Aap_uEA7vb0DDYVJWEaX3O-AtYp77AaswQKSGtDaimt3gt7QCNpdjp1BkdM6acJ96xTec3tsV_ZJNL_JP-lqsVxydG3nh739RE_hepOOL05tfJh2_ranjMadb3VoBYFvF0ma6S24qZ6QJUuV6sSRrhCskSBP5C1myCzsebztMfGvm7ij3gZT&key=YOUR_API_KEY
# https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJLU7jZClu5kcR4PcOOO6p3I0&fields=editorial_summary%2Cname%2Crating%2Cformatted_phone_number&key=AIzaSyDyXSZ08UcMnS8zPEMZlbn3RUD-59fF4KM
