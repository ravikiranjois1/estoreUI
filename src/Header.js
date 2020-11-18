import React, {useContext, useState} from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import AWS from 'aws-sdk'
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { UserProvider, UserContext, UserDispatchContext } from "./UserState";
import { useHistory } from "react-router-dom";




function Header(props) {
  const location = useLocation();
  const history = useHistory();
  const [upload, setUpload] = useState();
  const [file, setFile] = useState();
  const [{ basket, user }, dispatch] = useStateValue();
  const [searchText, setSearchText] = useState();
  const userDetails = useContext(UserContext);
  console.log("In header");
  console.log(userDetails);


  AWS.config.update({
    accessKeyId: 'AKIAYUPXS4UXVNYE2PD2',
    secretAccessKey: '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'
  })

  const myBucket = new AWS.S3({
    params: { Bucket: 'estore-rekognition'},
    region: 'us-east-1',
  })


  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  }

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  }

  const handleSearch = (d) => {
    // event.preventDefault();
    if (d.x) {
      history.push({pathname: '/search', state: { searchText: d.data }});
    }
    else{
      console.log("Clicked on signIn");
      history.push({pathname: '/search', state: { searchText: searchText }});
    }
  }

  // useEffect(() => {
  //     handleSearch();
  //    console.log('Do something after counter has changed', searchText);
  // }, [searchText]);


  const uploadFile = () => {
    console.log(file);
    const params = {
      'ACL': 'public-read',
      'Key': userDetails.email + ".jpg",
      'ContentType': file.type,
      'Body': file,
    }
    myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
        // that's how you can keep track of your upload progress
        setUpload({
          progress: Math.round((evt.loaded / evt.total) * 100),
        })
      })
      .send((err) => {
         if (err) {
           console.log(err);
           // handle the error here
         }
      })

      const url = 'https://om9htfa30g.execute-api.us-east-1.amazonaws.com/dev/rekognition/' + userDetails.email;
      fetch(url)
      .then(res => res.json())
      .then((data) => {
        setSearchText(data);
        handleSearch({"data" : data, "x": true});
        console.log(data);
      })
      .catch(console.log)



  }

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://front-end-data-shophere.s3.amazonaws.com/Logo.png"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" value={searchText} onChange={e => setSearchText(e.target.value)}/>
        <SearchIcon className="header__searchIcon" onClick={handleSearch}/>
        <input className="header__searchInput" type="file" onChange={onFileChange}/>
        <button onClick={uploadFile}>
                  Upload!
                </button>
      </div>

      <div className="header__nav">
        <Link to={'/login'}>
          <div onClick={handleAuthenticaton} className="header__option">
            <span className="header__optionLineOne">Hello {userDetails.email == "None" ? 'Guest' : userDetails.email}</span>
            <span className="header__optionLineTwo">{userDetails.email != "None" ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>

        <Link to='/orders'>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
