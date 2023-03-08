import { useState, useEffect, useCallback, React } from "react";
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
  const dateArr = date.split("-")
  let  wordDate = new Date(dateArr[0],dateArr[1],dateArr[2])
  wordDate = wordDate.toDateString()
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
            <h3 className="text-white col"> Date: {wordDate} </h3>
            <div className="mr-4  d-flex justify-content-end"
            style={{paddingLeft:'0px', paddingRight:'10%', marginBottom:'1%'}}>
              <Link
                to={`/trips/${trip_id}/events/${date}/create`}
                className="btn btn-lg bg-blue-translucent rounded-0 text-white glow"
              >
                Create Event
              </Link>
            </div>
          </div>
          <div className="row">
            <table className="table h-100 table-striped text-white  col col-9"
            style={{width:'70%'}}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location Name</th>
                  <th>Location Address</th>
                  <th>Start Time</th>
                </tr>
              </thead>
              <tbody style={{width:'100px'}}>
                {events.map((event) => {
                  return (
                    <tr key={event.id}>
                      <td className="text-white">{event.event_name}</td>
                      <td className="text-white">{event.location.name}</td>
                      <td className="text-white">
                        {event.location.formatted_address}
                      </td>
                      <td className="text-white">{event.start_time}</td>
                      <div className="d-flex flew-row justify-content-end p-0"
                      style={{width:'80%'}}>
                        <div className="text-white d-flex rounded-0">
                          <button
                            onClick={() => deleteEvent(event.id)}
                            className="btn bg-red-translucent glow btn-lg px-4 text-white"
                          >
                            Delete
                          </button>
                        </div>
                        <div className="d-flex rounded-0">
                          <Link
                            to={`/trips/${trip_id}/events/detail/${event.id}`}
                            className="btn bg-blue-translucent glow btn-lg px-4 text-white"
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
            <div className="col-sm">
              <Map update={getEventData} location={location} events={events} />
            </div>
          </div>
        </div>
      </div>
    </div>,
  ];

  // return [
  //   <div className="container-fluid">
  //     <div className="row flex-nowrap">
  //       <ItinerarySidebar currentdate={date} trip_id={trip_id} />
  //       <div
  //         className="col py-3"
  //         style={{
  //           backgroundImage:
  //             "url( " + require("../images/background.jpg") + ")",
  //           backgroundRepeat: "no-repeat",
  //           backgroundSize: "cover",
  //           backgroundAttachment: "fixed",
  //         }}
  //       >
  //         <div>
  //           <h1 className="d-flex text-white justify-content-center">
  //             {tripName}
  //           </h1>
  //         </div>
  //         <div className="row mt-4">
  //           <h3 className="text-white col"> Date: {wordDate} </h3>
  //           <div className="mr-4  d-flex justify-content-end"
  //           style={{paddingLeft:'0px', paddingRight:'10%', marginBottom:'1%'}}>
  //             <Link
  //               to={`/trips/${trip_id}/events/${date}/create`}
  //               className="btn btn-lg bg-blue-translucent rounded-0 text-white glow"
  //             >
  //               Create Event
  //             </Link>
  //           </div>
  //         </div>
  //         <div className="row">
  //           <table className="table h-100 table-striped text-white  col col-9"
  //           style={{width:'70%'}}>
  //             <thead>
  //               <tr>
  //                 <th>Name</th>
  //                 <th>Location Name</th>
  //                 <th>Location Address</th>
  //                 <th>Start Time</th>
  //               </tr>
  //             </thead>
  //             <tbody style={{width:'100px'}}>
  //               {events.map((event) => {
  //                 return (
  //                   <tr key={event.id}>
  //                     <td className="text-white">{event.event_name}</td>
  //                     <td className="text-white">{event.location.name}</td>
  //                     <td className="text-white">
  //                       {event.location.formatted_address}
  //                     </td>
  //                     <td className="text-white">{event.start_time}</td>
  //                     <td className="d-flex flew-row justify-content-end p-0"
  //                     style={{width:'80%'}}>
  //                       <div className="text-white d-flex rounded-0">
  //                         <button
  //                           onClick={() => deleteEvent(event.id)}
  //                           className="btn bg-red-translucent glow btn-lg px-4 text-white"
  //                         >
  //                           Delete
  //                         </button>
  //                       </div>
  //                       <div className="d-flex rounded-0">
  //                         <Link
  //                           to={`/trips/${trip_id}/events/detail/${event.id}`}
  //                           className="btn bg-blue-translucent glow btn-lg px-4 text-white"
  //                         >
  //                           View Event
  //                         </Link>
  //                       </div>
  //                     </td>
  //                   </tr>
  //                 );
  //               })}
  //             </tbody>
  //           </table>
  //           <div className="col-sm">
  //             <Map update={getEventData} location={location} events={events} />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>,
  // ];
}

function Map(props) {
  const [averageCenter, setAverageCenter] = useState({});
  const [prevEventData, setprevEventData] = useState();
  const [map, setMap] = useState(null);

  const center = props.events[0].location.geo_location

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getAverage = async () => {
    console.log(props.events)
    let averageCenterLat = 0;
    let averageCenterLng = 0;

    props.events.forEach((event) => {
      averageCenterLat += event.location.geo_location.lat;
      averageCenterLng += event.location.geo_location.lng;
    });

    setprevEventData(props.events);

    setAverageCenter({
      lat: (averageCenterLat / props.events.length).toFixed(5),
      lng: (averageCenterLng / props.events.length).toFixed(5),
    });
  };

  // const onLoad = useCallback(function callback(map) {
  //   // This is just an example of getting and using the map instance!!! don't just blindly copy!
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   map.fitBounds(bounds);

  //   setMap(map)
  // }, [])

  // const onUnmount = useCallback(function callback(map) {
  //   setMap(null)
  // }, [])

  useEffect(() => {
    if (props.events != prevEventData) {
      getAverage();
    }
  }, [props.events]);
    if (averageCenter === {}) {
      return <div>Loading Map...</div>
    }
    console.log(averageCenter)
  return [
    <GoogleMap
      mapContainerStyle={{ width: "500px", height: "500px" }}
      zoom={10}
      center={center}
      // onLoad={onLoad}
      // onUnmount={onUnmount}
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
