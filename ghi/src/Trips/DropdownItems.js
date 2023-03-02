import { useState } from "react"
import { Link } from 'react-router-dom'

function DropDownItems(props) {
    const [ toggle, setToggle ] = useState(true);

    const handleToggle= () => {
        if (toggle) {
            setToggle(false)
        }
        else {setToggle(true)}
    }
    const trip= props.trip
    if (toggle) {
        return <button
        onClick={handleToggle}
                    id={`trip-dropdown-button-${trip.id}`}
                    type="button"
                    className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    aria-controls={`dropdown-example-${trip.id}`}
                    data-collapse-toggle={`dropdown-example-${trip.id}`}
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span
                      className="flex-1 ml-3 text-left whitespace-nowrap"
                      sidebar-toggle-item="true"
                    >
                      {trip.name}
                    </span>
                    <svg
                      sidebar-toggle-item="true"
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
    }
    return (
        <><button
        onClick={handleToggle}
            id={`trip-dropdown-button-${trip.id}`}
            type="button"
            className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls={`dropdown-example-${trip.id}`}
            data-collapse-toggle={`dropdown-example-${trip.id}`}
        >
            <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                ></path>
            </svg>
            <span
                className="flex-1 ml-3 text-left whitespace-nowrap"
                sidebar-toggle-item="true"
            >
                {trip.name}
            </span>
            <svg
                sidebar-toggle-item="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                ></path>
            </svg>
        </button><div id={`dropdown-example-${trip.id}`}>
                <ul
                    className="py-2 space-y-2"
                    aria-labelledby={`trip-dropdown-button-${trip.id}`}
                >
                    <li>
                        <Link
                            to={`/trips/${trip.id}/itinerary/${trip.start_date}`}
                            className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        >
                            Start: {trip.start_date}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`/trips/${trip.id}/itinerary/${trip.end_date}`}
                            className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        >
                            End: {trip.end_date}
                        </Link>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        >
                            **Picture** {trip.picture_url}
                        </a>
                    </li>
                </ul>
            </div></>
    )
}

export default DropDownItems
