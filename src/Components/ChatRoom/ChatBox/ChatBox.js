import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import React, { Component, Fragment } from "react";
import ChatTv from "../ChatTv/ChatTv";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      sent: false
    };
  }
 

  handleMsg = event => this.setState({ msg: event.target.value });
  submit = () => {
    let emailed = window.location.href.substring(36);
    let name = localStorage.getItem(emailed);
    let requestedBody = {
      email: emailed,
      name: name,
      message: this.state.msg
    };
    let resp = axios.post("http://localhost:3005/sendgroupmsg", requestedBody);
    resp.then(response => console.log(response));
    this.setState({
      sent: true
    });
  };
  useStyles = makeStyles(theme => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: 350
      }
    }
  }));
  render() {
    const classes = this.useStyles;

    return (
      <Fragment>
        {/* <ChatTv sent={this.state.msg} /> */}
        <div className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Chat Here"
            variant="outlined"
            onChange={this.handleMsg}
          />
          <button onClick={this.submit} style={{Width:20}}>Send Message</button>
          
        </div>
      </Fragment>
    );
  }
}
export default ChatBox;
