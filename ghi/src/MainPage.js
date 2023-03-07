import SignUp from "./Accounts/SignUp";
import Login from "./Accounts/Login";

function MainPage() {

  return (
        <>
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
        <h3 className="text-white italic cursive">
          We know where you're headed...
        </h3>
        <div id="carouselExampleAutoplaying" className="carousel slide container" data-bs-ride="carousel">
  <div className="carousel-inner carousel-item-size center border glow">
    <div className="carousel-item active">
      <img src="https://c4.wallpaperflare.com/wallpaper/134/234/391/photography-mountains-snow-landscape-wallpaper-preview.jpg" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://www.outsideonline.com/wp-content/uploads/2018/11/20/outside-guide-grand-canyon_h.jpg" className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
        <div className="d-flex justify-content-center"
          style={{
          }}
        >
          <div className="d-flex flex-row justify-content-center"
          style={{
            width:"12%"
          }}

          >
            <div className="m-1">
              < SignUp />
            </div>
            <div className="m-1">
              < Login />
            </div>
          </div>
        </div>
    </div>
    </>
  );
}

export default MainPage;
