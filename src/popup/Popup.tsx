import React from "react";
import { RepositoryInfo } from "../github";
import UserInfoInput from "./components/UserInfoInput";
import { AppBar, Toolbar, Box, List, ListItem, ListItemText, LinearProgress, Typography, MenuItem, Menu, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NoRepos from "./components/NoRepos";
import RepositoryCard from "./components/RepositoryCard";

interface PopupState {
  stars: RepositoryInfo[];
  isLoaded: boolean;
  needInit: boolean;
  user: string;
  anchor: Element;
}

export default class Popup extends React.Component<any, PopupState> {
  constructor(props) {
    super(props);
    this.state = {stars: [], isLoaded: false, needInit: false, user: null, anchor: null};
    this.onUserChanged = this.onUserChanged.bind(this);
    this.onUserChangeButtonClicked = this.onUserChangeButtonClicked.bind(this);
    this.onMenuButtonClicked = this.onMenuButtonClicked.bind(this);
    this.onMenuClose = this.onMenuClose.bind(this);
  }

  componentDidMount() {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
    if(this.state.isLoaded) return;
    chrome.storage.sync.get({
      user: null
    }, items => {
      const {user} = items;
      if(!user) { 
        this.setState({stars: [], isLoaded: false, needInit: true, user: null}); 
        return; 
      }
      fetch(`http://api.github.com/users/${user}/starred`)
      .then(async res => {
        this.setState({ stars: RepositoryInfo.getReposFromJsonArray(await res.json()), isLoaded: true, needInit: false, user: user });
        console.log('log');
      })
      .catch(err => {
        console.log(err);
        this.setState({stars: [], isLoaded: false, needInit: true, user: null }); 
      });
    });
  }

  componentDidUpdate(props, state) {
    if(this.state.isLoaded) return;
    chrome.storage.sync.get({
      user: null
    }, items => {
      const {user} = items;
      if(!user) { 
        this.setState({stars: [], isLoaded: false, needInit: true, user: null}); 
        return; 
      }
      fetch(`http://api.github.com/users/${user}/starred`)
      .then(async res => {
        this.setState({ stars: RepositoryInfo.getReposFromJsonArray(await res.json()), isLoaded: true, needInit: false, user: user });
      })
      .catch(err => {
        console.log(err);
        this.setState({stars: [], isLoaded: false, needInit: true, user: null, anchor: null });
      });
    });
  }

  

  onUserChanged() {
    this.setState({stars: [], isLoaded: false, needInit: false, user: null, anchor: null });
  }

  onUserChangeButtonClicked() {
    chrome.storage.sync.set({
      user: null
    }, () => {
      this.onUserChanged();
    });
  }

  onMenuButtonClicked(event) {
    this.setState({anchor: event.currentTarget});
  }

  onMenuClose() {
    this.setState({anchor: null});
  }

  render() {
    if(this.state.needInit) {
      return (
        <Box width="500px" height="300px">
          <UserInfoInput onUserChanged={this.onUserChanged}/>
        </Box>
      );
    }
    if(!this.state.isLoaded) {
      return (
        <Box width="500px" height="600px">
          <Typography variant="h5">???????????? ???</Typography>
          <LinearProgress />
        </Box>
      );
    }

    else {
      const repos = this.state.stars.map((repo, i) => {
        console.log(repo);
        return (
          <RepositoryCard repo={repo}/>
        );
      });
      console.log(repos);
      return (
        <div style={{width: "500px", height: "600px", padding: "0px", margin: "0px"}}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit">
                {this.state.user}?????? ?????? ??????
              </Typography>
              <IconButton color="inherit" onClick={this.onMenuButtonClicked}><MenuIcon/></IconButton>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchor}
                disableScrollLock={true}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(this.state.anchor)}
                onClose={this.onMenuClose}
              >
                <MenuItem onClick={this.onUserChanged}>????????????</MenuItem>
                <MenuItem onClick={this.onUserChangeButtonClicked}>????????? ??????</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
          {repos.length > 0 ? 
            ( <List>
                {repos}
              </List>
            ) : (
              <NoRepos onRefreshClicked={this.onUserChanged} onUserChangeClicked={this.onUserChangeButtonClicked}/>
            )
          }
        </div>
      );
    } 
  } 
}