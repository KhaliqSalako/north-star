import { useToken } from "./auth";

function LogOut() {
  const { token, logout } = useToken();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    console.log("token-----", token);
  };

  return (
    <div>
      <button 
        onClick={handleLogout}
        className="btn bg-blue rounded-pill text-white"
        style={{
        }}
      >Logout</button>
    </div>
  );
}

export default LogOut;
