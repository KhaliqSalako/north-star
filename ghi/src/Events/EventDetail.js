import { useState, useEffect, useMemo } from "react";
import { useAuthContext } from "../Accounts/auth";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import GoogleMapReact from 'google-map-react'
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";


export default function EventDetail() {
  const { token } = useAuthContext();
  const [event, setEvent] = useState([]);
  const [isEventDataLoaded, setIsEventDataLoaded] = useState(false);
  const params = useParams();
  const trip_id = params.trip_id;
  const event_id = params.event_id
  const photo_reference = event?.location?.photo_reference;
  const picture_url =
  "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference="
  + photo_reference
  + "&key="
  + process.env.REACT_APP_GOOGLE_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const getEvent = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips/${trip_id}/events/${event_id}`,
      {
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      setEvent(data);
      setIsEventDataLoaded(true);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  if (!isLoaded || !isEventDataLoaded) return <div>Loading...</div>;
  return (
    <div
      className="row vh-100 w-100 d-flex justify-items-center"
      style={{
        backgroundImage: "url( " + require("../images/background.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="border col ml-5"
        style={{ width: "80%", paddingLeft: "12%", paddingRight: "5%" }}
      >
        <table className="table table-striped text-white">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white">{event.event_name}</td>
              <td className="text-white">{event.location?.name}</td>
              <td className="text-white">{event.date}</td>
              <td className="text-white">{event.start_time}</td>
              <td className="text-white">{event.details}</td>
              <div>
                <Link
                  to={`/trips/${trip_id}/events/detail/${event.id}/edit`}
                  className="btn bg-blue-translucent glow btn-lg rounded-pill px-4 gap-3 text-white"
                >
                  Edit Event
                </Link>
              </div>
            </tr>
          </tbody>
        </table>
        <div className="row">
          <div className="col-md-auto">
            <Map event={event} />
          </div>
          <div className="col-md-auto" style={{}}>
            <img
              src={picture_url}
              className="glow d-flex"
              style={{ resizeMode: "cover", height: "422px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


function Map(props) {
  const center = useMemo(() => ( props.event?.location?.geo_location ), []);


  return [

    <GoogleMap
      mapContainerStyle={{ width: "450px", height: "422px" }}
      zoom={12}
      center={center}
      mapContainerClassName="map-container"
    >
      <MarkerF position={center} />
    </GoogleMap>
  ];
}
