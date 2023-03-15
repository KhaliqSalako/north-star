import requests
# from .api_keys import Google_APIKey
import os


class LocationQueries:
    def get_location_by_name(self, location_search: str):
        try:
            location_res = requests.get(
                "https://maps.googleapis.com/maps/api/"
                + "place/findplacefromtext/json?input="
                + location_search
                + "&inputtype=textquery&fields=place_id%2Cphotos"
                + "%2Cformatted_address%2Cname%2Cgeometry&key="
                + os.environ.get('REACT_APP_GOOGLE_API_KEY')
            )
            if location_res.status_code == 200:
                location_data = location_res.json()
                location = {}
                location["name"] = location_data["candidates"][0]["name"]
                location["geo_location"] = location_data["candidates"][0][
                    "geometry"
                ]["location"]
                location["formatted_address"] = location_data["candidates"][0][
                    "formatted_address"
                ]
                location["photo_reference"] = location_data["candidates"][0][
                    "photos"
                ][0]["photo_reference"]
                place_id = location_data["candidates"][0]["place_id"]
                details_res = requests.get(
                    "https://maps.googleapis.com/maps/api/"
                    + "place/details/json?place_id="
                    + place_id
                    + "&fields=editorial_summary&key="
                    + os.environ.get('REACT_APP_GOOGLE_API_KEY')
                )
                if location_res.status_code == 200:
                    details_data = details_res.json()
                    if "editorial_summary" in details_data["result"]:
                        location["details"] = details_data["result"][
                            "editorial_summary"
                        ]["overview"]
                        return location
                    else:
                        location["details"] = ""
                        return location
                else:
                    return None
            else:
                return None
        except IndexError:
            return "This location does not exist"
