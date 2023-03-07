import SignUp from "./Accounts/SignUp";
import Login from "./Accounts/Login";

function MainPage() {

  return (
      <div 
        className="text-center bg-black vh-100 vw-100"
        style={{
          backgroundImage:`url(background.jpg)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: "cover"
        }}
      >
        <h1 
          className="pt-5 fw-bold font-['Orbitron'] text-white"
        >
          North Star
        </h1>
        <div className="d-flex justify-content-center"
          style={{
          }}
        >
          <div className="row"
          style={{
            width:"12%"
          }}

          >
            <div className="col m-1">
              < SignUp />
            </div>
            <div className="col m-1">
              < Login />
            </div>
          </div>
        </div>
       
    </div>
  );
}

export default MainPage;
