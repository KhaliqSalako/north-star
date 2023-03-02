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
    <div className="container">
      <table className="table table-striped">
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
            <td>{event.event_name}</td>
            <td>{event.location?.name}</td>
            <td>{event.date}</td>
            <td>{event.start_time}</td>
            <td>{event.details}</td>
            <td>
              <Link
                to={`/trips/${trip_id}/events/detail/${event.id}/edit`}
                className="btn btn-primary btn-lg px-4 gap-3"
              >
                Edit Event
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
      <img src={picture_url} className="card-img-top" />
      <Map event={event} />
    </div>
  );
}


function Map(props) {
  const center = useMemo(() => ( props.event?.location?.geo_location ), []);


  return [

    <GoogleMap
      mapContainerStyle={{ width: "500px", height: "500px" }}
      zoom={10}
      center={center}
      mapContainerClassName="map-container"
    >
      <MarkerF position={center} />
    </GoogleMap>
  ];
}
