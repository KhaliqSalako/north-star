import { useState, useEffect, useMemo, React } from "react";
import { useAuthContext } from "../Accounts/auth";
import { Link, useLocation } from "react-router-dom";
import { Outlet, useParams } from "react-router";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import ItinerarySidebar from "./ItinerarySidebar";

function Itinerary() {
  const { token } = useAuthContext();
  const [events, setEvents] = useState([]);
  const [isEventDataLoaded, setIsEventDataLoaded] = useState(false);
  const params = useParams();
  const trip_id = params.id;
  const date = params.date;
  const location = useLocation();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const getEventData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips/${trip_id}/itinerary/${date}`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      setEvents(data.events);
      setIsEventDataLoaded(true);
    }
  };

  useEffect(() => {
    getEventData();
  }, [location]);

  const deleteEvent = async (event_id) => {
    const response = await fetch(
      `${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips/${trip_id}/events/${event_id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    getEventData();
  };
  if (!isLoaded || !isEventDataLoaded) return <div>Loading...</div>;
  return [
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <ItinerarySidebar trip_id={trip_id} />
        <div className="col py-3">
          <h1> Date {date} </h1>
          <div className="container justify-content-center">
            <Link
              to={`/trips/${trip_id}/events/${date}/create`}
              className="btn btn-primary btn-lg px-4 gap-3"
            >
              Create Event
            </Link>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location Name</th>
                  <th>Location Address</th>
                  <th>Start Time</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => {
                  return (
                    <tr key={event.id}>
                      <td>{event.event_name}</td>
                      <td>{event.location.name}</td>
                      <td>{event.location.formatted_address}</td>
                      <td>{event.start_time}</td>
                      <td>{event.details}</td>
                      <td>
                        <button onClick={() => deleteEvent(event.id)}>
                          Delete
                        </button>
                      </td>
                      <td>
                        <Link
                          to={`/trips/${trip_id}/events/detail/${event.id}`}
                          className="btn btn-primary btn-lg px-4 gap-3"
                        >
                          View Event
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Map update={getEventData} location={location} events={events} />
          </div>
        </div>
      </div>
    </div>,
  ];
}

function Map(props) {
  const [averageCenter, setAverageCenter] = useState({});
  const [prevEventData, setprevEventData] = useState();

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getAverage = async () => {
    let averageCenterLat = 0;
    let averageCenterLng = 0;

    props.events.forEach((event) => {
      averageCenterLat += event.location.geo_location.lat;
      averageCenterLng += event.location.geo_location.lng;
    });

    setprevEventData(props.events);

    setAverageCenter({
      lat: averageCenterLat / props.events.length,
      lng: averageCenterLng / props.events.length,
    });
  };

  useEffect(() => {
    if (props.events != prevEventData) {
      getAverage();
    }
  }, [props.events]);
  console.log(averageCenter);

  return [
    <GoogleMap
      mapContainerStyle={{ width: "500px", height: "500px" }}
      zoom={10}
      center={averageCenter}
      mapContainerClassName="map-container"
    >
      {props.events.map((event) => {
        const position = event?.location?.geo_location;
        return <MarkerF position={position} />;
      })}
    </GoogleMap>,
  ];
}

export default Itinerary;
