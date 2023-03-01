import DropDownItems from "./DropdownItems";

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
                  <DropDownItems trip= {trip}/>
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
