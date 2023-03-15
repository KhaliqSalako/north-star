/* eslint-disable */
import { useState, useEffect, useMemo } from "react";
import getDaysPls from "./getdaysArray.js";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function ItinerarySidebar(props) {
  const [tripData, setTripData] = useState({});
  const [days, setDays] = useState([]);
  const [isTripDataLoaded, setIsTripDataLoaded] = useState(false);
  const currentdate = props.currentdate;
  const getTripData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips/${props.trip_id}`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      setTripData(data);
      setIsTripDataLoaded(true);
      getDays(data);
    }
  };
  const getDays = (data) => {
    const start_date = data.start_date;
    const end_date = data.end_date;
    const dayslist = getDaysPls(new Date(start_date), new Date(end_date));
    setDays(dayslist);
  };
  useEffect(() => {
    getTripData();
  }, []);

  if (!isTripDataLoaded) {
    return (
      <div
        className="col py-3"
        style={{
          backgroundImage: "url( " + require("../images/background.jpg") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        Trip Data is Loading
      </div>
    );
  }

  return (
    <div className="custom-body-font fw-bold col-auto col px-sm-2 px-0 bg-dark">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <div className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="custom-font d-none d-sm-inline">
            Trip Dates:
          </span>
        </div>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="dates"
        >
          {days.map((day, i) => {
            const date = day.toISOString().slice(0, 10);
            if (date === currentdate) {
              return (
                <li key={uuidv4()} className="">
                  <Link
                    state={{ state_date: "date" }}
                    to={`/trips/${props.trip_id}/itinerary/${date}`}
                    className="nav-link align-middle px-0 text-white text-glow"
                  >
                    {date}
                  </Link>
                </li>
              );
            }
            return (
              <li key={uuidv4()} className="">
                <Link
                  state={{ state_date: "date" }}
                  to={`/trips/${props.trip_id}/itinerary/${date}`}
                  className="nav-link align-middle px-0 text-white"
                >
                  {date}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default ItinerarySidebar;
