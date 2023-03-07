import { useState, useEffect, useMemo, React } from "react";
import { useAuthContext } from "../Accounts/auth";
import { Link, useLocation } from "react-router-dom";
import { Outlet, useParams } from "react-router";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import ItinerarySidebar from "./ItinerarySidebar";

function Itinerary() {
  const { token } = useAuthContext();
  const [tripName, setTripName] = useState("");
  const [events, setEvents] = useState([]);
  const [isEventDataLoaded, setIsEventDataLoaded] = useState(false);
  const params = useParams();
  const trip_id = params.id;
  const date = params.date;
  const location = useLocation();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const getTripName = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips/${trip_id}`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      setTripName(data.name);
  }
}

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
    getTripName();
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
        <ItinerarySidebar currentdate={date} trip_id={trip_id} />
        <div
          className="col py-3"
          style={{
            backgroundImage:
              "url( " + require("../images/background.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
        >
          <div>
            <h1 className="d-flex text-white justify-content-center">
              {tripName}
            </h1>
          </div>
          <div className="row mt-4">
            <h3 className="text-white col"> Date {date} </h3>
            <div className="d-flex col"
            style={{paddingLeft:'0px'}}>
              <Link
                to={`/trips/${trip_id}/events/${date}/create`}
                className="btn btn-lg bg-blue rounded-pill text-white glow"
              >
                Create Event
              </Link>
            </div>
          </div>
          <div className="row">
            <table className="table table-striped text-white col">
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
                      <td className="text-white">{event.event_name}</td>
                      <td className="text-white">{event.location.name}</td>
                      <td className="text-white">
                        {event.location.formatted_address}
                      </td>
                      <td className="text-white">{event.start_time}</td>
                      <td className="text-white">{event.details}</td>
                      <div className="d-flex flex-row">
                        <div className="text-white d-flex rounded-0">
                          <button
                            onClick={() => deleteEvent(event.id)}
                            className="btn bg-red-translucent glow btn-lg px-4 gap-3 text-white"
                          >
                            Delete
                          </button>
                        </div>
                        <div className="d-flex rounded-0">
                          <Link
                            to={`/trips/${trip_id}/events/detail/${event.id}`}
                            className="btn bg-blue-translucent glow btn-lg px-4 gap-3 text-white"
                          >
                            View Event
                          </Link>
                        </div>
                      </div>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="col mt-4">
              <Map update={getEventData} location={location} events={events} />
            </div>
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
