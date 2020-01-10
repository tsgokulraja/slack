import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import React, { Component } from "react";
import SearchUser from "../../SearchUser/SearchUser";

class ChatTv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      groupArray: [],
      show: false,
      rec: "",
      msg: ""
    };
  }

  componentDidMount() {
    console.log("Mounted");
    this.getGroup();
  }

  getGroup = () => {
    let groupApi = new Promise(async (resolve, reject) => {
      let groupMsg = await axios.get("http://localhost:3005/group");
      resolve(groupMsg);
      console.log("APi", groupMsg);
    });
    groupApi.then(response => {
      console.log(response);
      this.setState({
        groupArray: response.data,
        show: true
      });
    });
  };

  handleMsg = event => this.setState({ msg: event.target.value });
  submit = () => {
    let emailed = window.location.href.substring(36);
    let name = localStorage.getItem(emailed);
    let requestedBody = {
      email: emailed,
      name: name,
      message: this.state.msg
    };
    axios.post("http://localhost:3005/sendgroupmsg", requestedBody);
    setTimeout(this.getGroup, 1000);
  };

  useStyles = makeStyles(theme => ({
    root: {
      "& > *": {
        margin: theme.spacing(1)
      }
    },
    text: {
      padding: theme.spacing(2, 2, 0)
    },
    paper: {
      paddingBottom: 50,
      Width: 80
    },
    list: {
      marginBottom: theme.spacing(2)
    },
    subheader: {
      backgroundColor: theme.palette.background.paper
    },
    appBar: {
      top: "auto",
      bottom: 0
    },
    grow: {
      flexGrow: 1
    },
    grpButton: {
      width: 200
    },
    fabButton: {
      position: "absolute",
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: "0 auto"
    }
  }));

  render() {
    const classes = this.useStyles;

    return (
      <React.Fragment>
        <SearchUser />
        <CssBaseline />
        <Paper square className={classes.paper}>
          <Button
            variant="contained"
            className={classes.grpButton}
            color="primary"
            disableElevation
          >
            Go-Chat Group
          </Button>
          <Typography className={classes.text} variant="h5" gutterBottom>
            Inbox
          </Typography>
          <List className={classes.list}>
            {this.state.groupArray.map(({ email, name, message }, index) => (
              <React.Fragment key={index}>
                {<ListSubheader className={classes.subheader}></ListSubheader>}
                {/* {id === 3 && <ListSubheader className={classes.subheader}>Yesterday</ListSubheader>} */}
                <ListItem button>
                  <ListItemText primary={name} secondary={message} />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>

        <div className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Chat Here"
            variant="outlined"
            onChange={this.handleMsg}
          />
          <button onClick={this.submit} style={{ Width: 20 }}>
            Send Message
          </button>
        </div>
      </React.Fragment>
    );
  }
}
export default ChatTv;
