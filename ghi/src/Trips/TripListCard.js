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
    <div style={{height:"100%", border:"1px solid black"}}>
      <div style={{border:"1px solid green"}}>
        <img
          max-width={"100px"}
          src={trip.picture_url}
          className="card-img-top"
          alt="..."
        />
      </div>
      <div className="card-body">
        <h1 className="card-title">{trip.name}</h1>
        <p className="card-text">{trip.start_date}</p>
        <p className="card-text">{trip.end_date}</p>
      </div>
      <div className="d-flex card-body align-items-baseline">
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
