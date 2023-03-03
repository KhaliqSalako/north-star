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
<div>
  <img max-width={"100px"} src={trip.picture_url} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{trip.name}</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <div className="card-body">
    <a href="#" className="card-link">Card link</a>
    <button href="#" className="card-link">Another link</button>
    <p>
        <button onClick={() => deleteTrip(trip.id)}>Delete</button>
    </p>
  </div>
</div>
</>
);

}

export default TripListCard
