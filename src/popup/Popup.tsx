import React from "react";
import { RepositoryInfo, GithubUser } from "../github";
import { AppBar, Toolbar, Box, List, ListItem, ListItemText, LinearProgress, Typography } from "@material-ui/core";
//import "./Popup.scss";

interface PopupState {
  stars: RepositoryInfo[];
  isLoaded: boolean;
}

export default class Popup extends React.Component<any, PopupState> {
  constructor(props) {
    super(props);
    this.state = {stars: [], isLoaded: false};
  }

  componentDidMount() {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
    let user = "fred16157";
    fetch(`http://api.github.com/users/${user}/starred`)
    .then(async res => {
      this.setState({ stars: RepositoryInfo.getReposFromJsonArray(await res.json()), isLoaded: true});
      console.log('log');
    })
    .catch(err => {
      console.log(err);
    });
  }

  ListItemLink(props) {
    return <ListItem button divider component="a" {...props} />;
  }
  render() {
    if(!this.state.isLoaded) {
      return (
        <Box width="400px" height="600px" className="mid">
          <Typography variant="h5">불러오는 중</Typography>
          <LinearProgress />
        </Box>
      )
    }
    else {
      const repos = this.state.stars.map((repo, i) => {
        console.log(repo);
        return (
          <this.ListItemLink href={repo.htmlUrl} target="_blank">
            <ListItemText primary={repo.name} secondary={repo.description} ></ListItemText>
          </this.ListItemLink>
        )
      });
      console.log(repos);
      return (
        <Box width="400px" height="600px" padding="0px" margin="0px">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit">
                스타 목록
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            {repos}
          </List>
        </Box>
      );
    } 
  } 
}