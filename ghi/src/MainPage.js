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
          className="pt-5 title-font text-white"
        >
          North Star
        </h1>
        <h3 className="text-white italic cursive">
          You know where you're headed...
        </h3>
        <div id="carouselExampleAutoplaying" className="carousel slide container" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="3" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="4" aria-label="Slide 5"></button>
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="5" aria-label="Slide 6"></button>
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="6" aria-label="Slide 7"></button>
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="7" aria-label="Slide 8"></button>
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="8" aria-label="Slide 9"></button>
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="9" aria-label="Slide 10"></button>
        </div>
  <div className="carousel-inner carousel-item-size center border glow">
    <div className="carousel-item active data-bs-interval=3000">
      <img src="https://c4.wallpaperflare.com/wallpaper/134/234/391/photography-mountains-snow-landscape-wallpaper-preview.jpg" className="d-block w-100" alt="..." data-bs-slide="0"/>
        <div className="carousel-caption d-none d-md-block">
        <h5>Mount Everest, Nepal</h5>
      </div>
    </div>
    <div className="carousel-item active data-bs-interval=3000">
      <img src={require("./images/hawaii-photo.jpg")} className="d-block w-100" alt="..." data-bs-slide="0"/>
        <div className="carousel-caption d-none d-md-block">
        <h5>Hawaii, USA</h5>
      </div>
    </div>
    <div className="carousel-item active data-bs-interval=3000">
      <img src={require("./images/santorini.jpg")} className="d-block w-100" alt="..." data-bs-slide="0"/>
        <div className="carousel-caption d-none d-md-block">
        <h5>Santorini, Greece</h5>
      </div>
    </div>
    <div className="carousel-item active data-bs-interval=3000">
      <img src={require("./images/niagara-falls.jpg")} className="d-block w-100" alt="..." data-bs-slide="0"/>
        <div className="carousel-caption d-none d-md-block">
        <h5>Niagara Falls, USA</h5>
      </div>
    </div>
    <div className="carousel-item active data-bs-interval=3000">
      <img src={require("./images/alexandria.jpg")} className="d-block w-100" alt="..." data-bs-slide="0"/>
        <div className="carousel-caption d-none d-md-block">
        <h5>Alexandria, Egypt</h5>
      </div>
    </div>
    <div className="carousel-item active data-bs-interval=3000">
      <img src={require("./images/rio-jesus.jpg")} className="d-block w-100" alt="..." data-bs-slide="0"/>
        <div className="carousel-caption d-none d-md-block">
        <h5>Rio De Janeiro, Brazil</h5>
      </div>
    </div>
    <div className="carousel-item active data-bs-interval=3000">
      <img src={require("./images/tokyo-fuji.jpg")} className="d-block w-100" alt="..." data-bs-slide="0"/>
        <div className="carousel-caption d-none d-md-block">
        <h5>Tokyo, Japan</h5>
      </div>
    </div>
    <div className="carousel-item active data-bs-interval=3000">
      <img src={require("./images/seljalandsfoss.jpg")} className="d-block w-100" alt="..." data-bs-slide="0"/>
        <div className="carousel-caption d-none d-md-block">
        <h5>Seljalandsfoss, Iceland</h5>
      </div>
    </div>
    <div className="carousel-item active data-bs-interval=3000">
      <img src={require("./images/uluru.jpg")} className="d-block w-100" alt="..." data-bs-slide="0"/>
        <div className="carousel-caption d-none d-md-block">
        <h5>Uluru, Australia</h5>
      </div>
    </div>
    <div className="carousel-item data-bs-interval=3000">
      <img src="https://www.outsideonline.com/wp-content/uploads/2018/11/20/outside-guide-grand-canyon_h.jpg" className="d-block w-100" alt="..."/>
        <div className="carousel-caption d-none d-md-block">
        <h5 className="outline">The Grand Canyon, USA</h5>
      </div>
    </div>
  </div>
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
