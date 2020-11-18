import React, {useContext, useState} from "react";
import "./Home.css";
import Product from "./Product";
import { useEffect } from "react";
import axios from 'axios';
// import { useStateValue } from "./StateProvider";
import { UserProvider, UserContext, UserDispatchContext } from "./UserState";


function Home() {
  const userDetails = useContext(UserContext);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [recommendations2, setRecommendations2] = useState([]);
  // let recommendations = [];
  useEffect(() => {
         setShowRecommendation(true);
         console.log(userDetails)
         const url = 'https://om9htfa30g.execute-api.us-east-1.amazonaws.com/dev/personalize/' + userDetails.email;
         fetch(url)
         .then(res => res.json())
         .then((data) => {
           setRecommendations(data.slice(0, 3).map((recommendation) =>
               <Product id={recommendation} />
             ));
           setRecommendations2(data.slice(3, 6).map((recommendation) =>
               <Product id={recommendation} />
             ));
         })
         .catch(console.log)
       // }
    }, [userDetails]);

  console.log(recommendations);

  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://front-end-data-shophere.s3.amazonaws.com/backdrop.png"
          alt=""
        />

        {userDetails.email != "None" &&
        <div className="recommendation">
          <h1>Recommended for you</h1>
          <div className="home__row">
            {recommendations}
          </div>
          <div className="home__row">
            {recommendations2}
          </div>
        </div>}

        <div className="popular">
          <h1>Popular on the website</h1>
          <div className="home__row">
            <Product
              id="B00000IXIV"
            />
            <Product
              id="B00006ICF6"
            />
            <Product
              id="B00CTFIGXW"
            />
          </div>

          <div className="home__row">
            <Product
              id="B00BZS4JT4"
            />
            <Product
              id="B00AA10A0E"
            />
            <Product
              id="B000F6VBLQ"
            />


          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
