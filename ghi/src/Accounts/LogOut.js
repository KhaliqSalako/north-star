import { useToken } from "./auth";

function LogOut() {
  const { token, logout } = useToken();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    console.log("token-----", token);
  };

  if (!token) {
    return <></>
  } else{
    return (
      <div>
        <button
          onClick={handleLogout}
          className="btn btn-outline-dark glow-small text-white rounded-0"
        >
          Logout
        </button>
      </div>
    );
  }
}

export default LogOut;
