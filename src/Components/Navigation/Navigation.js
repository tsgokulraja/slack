import React , {Fragment} from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../Constants/routes';
import './header.css';
const Navigation = (props) => {
   
    return(
    <Fragment>
    <div className="header-container">
      <div className="flex-container">
        <div className="signIn">
    <ul>
    <li>
                  <a className="active" href="/">
                    Go-Chat
                  </a>
                </li>
      
      
      <ul style={{float:"right"}}>
      {/* <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li> */}
     {props.logged && <Fragment><li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </li></Fragment>}
      </ul>
      </ul>
      
     
  </div>
  </div>
  </div>

  </Fragment>)
}
export default Navigation;