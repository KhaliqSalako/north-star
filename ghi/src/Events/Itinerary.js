import { useState, useEffect, React } from "react";

import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import ItinerarySidebar from "./ItinerarySidebar";
import { v4 as uuidv4 } from "uuid";
import toDateFormat from "../common/date";

function Itinerary() {
  const [tripName, setTripName] = useState("");
  const [events, setEvents] = useState([]);
  const [isEventDataLoaded, setIsEventDataLoaded] = useState(false);
  const params = useParams();
  const trip_id = params.id;
  const date = params.date;
  const wordDate = toDateFormat(date)


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
    const trip_response = await fetch(
      `${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips/${trip_id}`,
      {
        credentials: "include",
      }
    );
    if (trip_response.ok) {
      const trip_data = await trip_response.json();
      setTripName(trip_data.name);
    }
  };

  useEffect(() => {
    getEventData();
    // getTripName();
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
            <h1 className="d-flex text-white justify-content-center custom-font">
              {tripName}
            </h1>
          </div>
          <div className="row mt-4">
            <h3 className="text-white col custom-font"> Date: {wordDate} </h3>
            <div className="mr-4  d-flex justify-content-end"
            style={{paddingLeft:'0px', paddingRight:'10%', marginBottom:'1%'}}>
              <Link
                to={`/trips/${trip_id}/events/${date}/create`}
                className="btn btn-lg bg-blue-translucent rounded-0 text-white glow-small custom-font"
              >
                Create Event
              </Link>
            </div>
          </div>
          <div className="row">
            <table className="table h-100 table-striped text-white  col col-9 m-1"
            style={{width:'70%'}}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location Name</th>
                  <th>Location Address</th>
                  <th>Time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody style={{}}
              className="">
                {events.map((event,i) => {
                  return (
                    <tr key={uuidv4()}>
                      <td className="text-white" style={{ width: "15%" }}>
                        {event.event_name}
                      </td>
                      <td className="text-white" style={{ width: "15%" }}>
                        {event.location.name}
                      </td>
                      <td
                        className="text-white"
                        style={{ width: "55%", height: "auto" }}
                      >
                        {event.location.formatted_address}
                      </td>
                      <td className="text-white" style={{ width: "5%" }}>
                        {event.start_time}
                      </td>
                      <td
                        className=" p-0 w-100  h-100"
                        style={{
                          height: "100%",
                          display: "inline-grid",
                          gridTemplateColumns: "auto auto auto",
                          boxSizing: "content-box",
                        }}
                      >
                        <div
                          className="text-white rounded-0 "
                          style={{
                            boxSizing: "content-box",
                          }}
                        >
                          <button
                            onClick={() => deleteEvent(event.id)}
                            className="btn bg-red-translucent glow-small btn-lg text-white h-100 py-0 custom-font"
                            style={{ boxSizing: "content-box" }}
                          >
                            Delete
                          </button>
                        </div>
                        <div
                          className=" rounded-0 h-100"
                          style={{ width: "145px", boxSizing: "content-box" }}
                        >
                          <Link
                            to={`/trips/${trip_id}/events/detail/${event.id}`}
                            className="btn bg-blue-translucent glow-small btn-lg text-white h-100 d-flex align-items-center py-auto custom-font"
                            style={{width:"auto", boxSizing:"border-box"}}

                          >
                            View Event
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="col-sm">
              <Map update={getEventData} location={location} events={events} />
            </div>
          </div>
        </div>
      </div>
    </div>,
  ];

}

function Map(props) {

  const [prevEventData, setprevEventData] = useState();

  const center = props.events[0]?.location.geo_location
  const [averageCenter, setAverageCenter] = useState(center);

  const getAverage = async () => {
    let averageCenterLat = 0;
    let averageCenterLng = 0;

    props.events.forEach((event) => {
      averageCenterLat += event.location.geo_location.lat;
      averageCenterLng += event.location.geo_location.lng;
    });

    setprevEventData(props.events);

    setAverageCenter({
      lat: parseFloat((averageCenterLat / props.events.length).toFixed(5)),
      lng: parseFloat((averageCenterLng / props.events.length).toFixed(5)),
    });
  };


  useEffect(() => {
    if (props.events !== prevEventData) {
      getAverage();
    }
  }, [props.events]);


  if(props.events.length === 0) return [<div className="text-white"></div>]
  return [
    <GoogleMap
      mapContainerStyle={{ width: "500px", height: "500px" }}
      zoom={10}
      center={averageCenter}
      mapContainerClassName="map-container"
    >
      {props.events.map((event,i) => {
          const position = event?.location?.geo_location;
          return <MarkerF key={uuidv4()} position={position} />;
        })}
    </GoogleMap>,
  ];
}

export default Itinerary;
