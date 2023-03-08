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
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
  <div className="carousel-inner carousel-item-size center border glow">
    <div className="carousel-item active data-bs-interval=3000">
      <img src="https://c4.wallpaperflare.com/wallpaper/134/234/391/photography-mountains-snow-landscape-wallpaper-preview.jpg" className="d-block w-100" alt="..." data-bs-slide="0"/>
        <div class="carousel-caption d-none d-md-block">
        <h5>Mount Everest, Nepal</h5>
      </div>
    </div>
    <div className="carousel-item data-bs-interval=3000">
      <img src="https://www.outsideonline.com/wp-content/uploads/2018/11/20/outside-guide-grand-canyon_h.jpg" className="d-block w-100" alt="..."/>
        <div class="carousel-caption d-none d-md-block">
        <h5>The Grand Canyon, Arizona, USA</h5>
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
