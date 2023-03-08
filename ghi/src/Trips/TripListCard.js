import { Link } from 'react-router-dom'
function TripListCard({trip, getTripData, name}) {

let  dateArr = trip.start_date.split("-")
let  wordDateStart = new Date(dateArr[0],dateArr[1],dateArr[2])
wordDateStart = wordDateStart.toDateString()

dateArr = trip.end_date.split("-")
let  wordDateEnd = new Date(dateArr[0],dateArr[1],dateArr[2])
wordDateEnd = wordDateEnd.toDateString()


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
    <div className='glow trip-card h-100'>
      <div style={{height: "65%"}}>
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
      <div className="card-body" style={{height: "27%"}}>
        <div className=" h-100 ">
        <h1 className="trip-card-title  text-white">{trip.name}</h1>
        <p className="card-text   text-white">{wordDateStart}</p>
        <p className="card-text  text-white">{wordDateEnd}</p>
        </div>
      </div>
        <div className="row-cols-2" style={{height: "8%"}}>
          <Link
            className="col btn bg-blue-translucent text-white rounded-0 glow-small h-100"
            to={`/trips/edit/${trip.id}`}
            state={{name:"name"}}
          >
            Edit
          </Link>
          <button
            className="col btn bg-red-translucent text-white rounded-0 glow-small square h-100"
            onClick={() => deleteTrip(trip.id)}
          >
            Delete
          </button>
        </div>
      </div>
);
}
export default TripListCard