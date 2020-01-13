import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./sigin.css";
const SignIn = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handleEmail = event => setemail(event.target.value);
  const handlePass = event => setpassword(event.target.value);
  const changeRoute = () => props.history.push('/chatroom'+'?user='+email);
  const submitted = async() => {  
    let flag = false;

    let re = /\S+@\S+\.\S+/;
    if (re.test(email) && password!=="") {
      flag = true;
    } else {
      alert("Enter Valid Email/Password");
    }

    if (flag){
      let users=await axios.get('http://localhost:3005/users')
      users.data.map((value,index)=>{
        console.log(value)
        if(value.email===email && value.password===password){
          
          localStorage.setItem(email,value.name);
          localStorage.setItem("currentUser",email);
          localStorage.setItem("logged",true);
          changeRoute()
       
          return true
        }else{
          localStorage.setItem("logged",false);
        } 

        return false;
      }
      
      )
    };
  };
  return (
    <Fragment>
      <div id="id01" className="modal">
        <div className="modal-content animate">
          <div className="imgcontainer">
            <span className="close" title="Close Modal">
              <Link to="/">&times;</Link>
            </span>
            <h3>Login</h3>
          </div>

          <div className="container">
            <label>
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="email"
              onChange={handleEmail}
              required
            />

            <label>
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="pass"
              onChange={handlePass}
              required
            />

            <button type="submit" onClick={submitted}>
              Login
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default SignIn;
