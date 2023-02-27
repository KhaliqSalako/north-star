import { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/auth";
import Tripsidebar from "./Tripsidebar";

function TripList() {
  const { token } = useAuthContext();
  const [trips, setTrips] = useState([]);

  const getTripData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips`,
      {
        credentials: "include",
        // headers: {
        // 'Authorization': `Bearer ${token}`
        // }
      }
    );

    if (response.ok) {
      const data = await response.json();
      setTrips(data.trips);
    }
  };

  useEffect(() => {
    getTripData();
  }, []);

  return (
    <>
      <Tripsidebar trips={trips}/>,
      <div key = {"lou"} className="container">
        </div>
        </>
        // {/* <table className="table table-striped">
        //   <thead>
        //     <tr>
        //       <th>Name</th>
        //       <th>Start Date</th>
        //       <th>End Date</th>
        //       <th>Photo</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {trips.map((trip) => {
        //       return (
        //         <tr key={trip.id}>
        //           <td>{trip.name}</td>
        //           <td>{trip.start_date}</td>
        //           <td>{trip.end_date}</td>
        //           <td>
        //             <img src={trip.picture_url} className="card-img-top" />
        //           </td>
        //         </tr>
        //       );
        //     })}
        //   </tbody>
        // </table> */}

  );
}
export default TripList;
