// import DropDownItems from "./DropdownItems";
import { useState, useEffect, useMemo } from "react";
import getDaysPls from "./getdaysArray.js"

function ItinerarySidebar(props) {
    const [tripData, setTripData] = useState({});
    const [days, setDays] = useState([]);
    const [isTripDataLoaded, setIsTripDataLoaded] = useState(false);
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
    console.log(dayslist)
    // Date.prototype.addDays = function(days) {
    // var date = new Date(this.valueOf());
    // date.setDate(date.getDate() + days);
    // return date;


    // let currentDate = start_date
    // let dateArray = new Array();
    // console.log(currentDate.valueOf())
    // while (currentDate.valueOf() <= end_date.valueOf()) {
    //     dateArray.push(new Date (currentDate));
    //     let date = new Date(currentDate.valueOf());
    //     date.setDate(date.getDate());
    //     currentDate = date

    // }
    // setDays(dateArray)

  }
  useEffect(() => {
    getTripData();
  }, []);
//   console.log(days)
//   console.log(tripData)
//   console.log(isTripDataLoaded)

  if (!isTripDataLoaded) {
        return(<div>Trip Data is Loading</div>)
    }


  return (
  <>
      <aside
        id=""
        className=""
        aria-label="Sidebar"
      >
        <h1>Trips</h1>
        <div className="">
          <ul className="">
            {days.map((day,i) => {
                const date = day.toISOString().slice(0, 10)
              return (
                <li key={i}>
                    <div>{date}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
</>
  )
}
export default ItinerarySidebar;
