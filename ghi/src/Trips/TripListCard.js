import { Link } from 'react-router-dom'

function TripListCard({trip, getTripData}) {

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
  <>
    <div  style={{ height: "100%", border: "1px solid black", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div style={{ border: "1px solid green" }}>
        <Link
          className="text-self-right btn btn-success"
          to={`/trips/${trip.id}/itinerary/${trip.start_date}`}
        >
          <img
            max-width={"100px"}
            src={trip.picture_url}
            className="card-img-top"
            alt="..."
          ></img>
        </Link>
      </div>
      <div className="card-body align-bottom">
        <h1 className="card-title text-white">{trip.name}</h1>
        <p className="card-text text-white">{trip.start_date}</p>
        <p className="card-text text-white">{trip.end_date}</p>
      </div>
      <div className="d-flex card-body justify-content-bottom">
        <p>
          <Link
            className="text-self-right btn btn-success"
            to={`/trips/edit/${trip.id}`}
          >
            Edit Trip
          </Link>
          <button
            className="text-self-right btn btn-danger"
            onClick={() => deleteTrip(trip.id)}
          >
            Delete
          </button>
        </p>
      </div>
    </div>
  </>
);

}

export default TripListCard
