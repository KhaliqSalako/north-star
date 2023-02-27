function Tripsidebar(props) {
  return (
  <>
      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <h1>Trips</h1>
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2">
            {props.trips.map((trip) => {
              return (
                <li key={trip.id}>
                  <button
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
                  <div id={`dropdown-example-${trip.id}`}>
                    <ul
                      className="py-2 space-y-2"
                      aria-labelledby={`trip-dropdown-button-${trip.id}`}
                    >
                      <li>
                        <a
                          href="#"
                          className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        >
                          Start: {trip.start_date}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        >
                          End: {trip.end_date}
                        </a>
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
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
</>
  )
}
export default Tripsidebar;
