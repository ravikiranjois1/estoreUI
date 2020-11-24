import React, { useContext, useState } from 'react';
import './Login.css'
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
// import { useStateValue } from "./StateProvider";
import { UserProvider, UserContext, UserDispatchContext } from "./UserState";
import {rest_endpoint} from "./constants";



function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setUserDetails = useContext(UserDispatchContext);

    const signIn = e => {
      e.preventDefault();
      console.log("Clicked on signIn");

      axios.post(rest_endpoint + 'signin',{
        "userID": email,
        "password": password
      })
      .then(res => {
        console.log(res);
        if(res.status == 200){
          history.push({
               pathname: '/',
           });
           setUserDetails({ email });
          // history.push({pathname: '/', state: { user_id: 'email' }});
        }
      })
    }


    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://front-end-data-shophere.s3.amazonaws.com/Logo.png'
                />
            </Link>

            <div className='login__container'>
                <h2>Sign-in</h2>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default Login
