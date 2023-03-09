import { Link } from 'react-router-dom'
import toDateFormat from '../common/date'

function TripListCard({trip, getTripData, name}) {
const  wordDateStart = toDateFormat(trip.start_date)
const  wordDateEnd = toDateFormat(trip.end_date)

const deleteTrip = async (trip_id) => {
    const response = await fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips/${trip_id}`, {
      method: 'DELETE',
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    getTripData()
  }

return (
  <div
    className="glow trip-card h-100 mx-auto"
    style={{ height: "150px", width: "475px", position: "relative" }}
  >
    <div style={{ height: "437px", width: "100%" }}>
      <Link
        className="text-self-right"
        to={`/trips/${trip.id}/itinerary/${trip.start_date}`}
      >
        <img
          height={"100%"}
          max-width={"100px"}
          src={trip.picture_url}
          className="card-img-top"
          alt="..."
        ></img>
      </Link>
    </div>
    <div className="card-body w-100 h-25 d-flex justify-content-center align-items-center" style= {{ position: "absolute", top:"300px"}}>
      <div className=''>
        <h1 className="text-white pt-2 text-wrap custom-font text-shadow">{trip.name}</h1>
      </div>
    </div>
    <p className="card-text text-white fw-bold text-shadow w-100" style= {{ position: "absolute", bottom:"35px"}}>{wordDateStart} - {wordDateEnd}</p>
    <div className="row-cols-2 align-content-end w-100" style= {{ position: "absolute", bottom:"0px"}}>
      <Link
        className="col btn bg-blue-translucent text-white custom-font rounded-0 glow-small h-100"
        to={`/trips/edit/${trip.id}`}
        state={{ name: "name" }}
      >
        Edit
      </Link>
      <button
        className="col btn bg-red-translucent text-white custom-font rounded-0 glow-small square h-100"
        onClick={() => deleteTrip(trip.id)}
      >
        Delete
      </button>
    </div>
  </div>
);

}

export default TripListCard
