import React, { useEffect, useState } from "react";


function MainPage() {
  // const [token, setToken] = useState("");

  // const getTokenData = async () => {
  //   const request = await fetch(`http://localhost:8000/token`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //     // Other fetch options, like method and body, if applicable
  //   });
  //     if (request.ok) {
  //       const data = await request.json();
  //       setToken(data);
  //       console.log(data)
  //     }

  //   useEffect(() => {
  //     getTokenData();
  //   }, []);

    //   var getToken = async () => {
    //   const response = await fetch(
    //     `http://localhost:8000/token`
    //   );
    //   if (response.ok) {
    //     const data = await response.json();
    //     setToken(data);
    //     console.log(data)
    //     console.log(token)
    //   }
    // };


    return (
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold font-['Orbitron']">CarCar</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
          </p>
        </div>
      </div>
    );
  // }

}


export default MainPage
