import React from "react";
import { RepositoryInfo, GithubUser } from "../github";
import "./Popup.scss";

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

  render() {
    if(!this.state.isLoaded) {
      return <div className="empty-box">
        <h2>불러오는 중</h2>
      </div>
    }
    else {
      const repos = this.state.stars.map((repo, i) => {
        console.log(repo);
        return (
          <div className="box">
            <div className="box-content">
              <a href={repo.htmlUrl} target="_blank">
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
              </a>
            </div>
            <hr/>
          </div>
        )
      });
      console.log(repos);
      return (
        <div>
          <h2>스타 목록</h2>
          {repos}
        </div>
      );
    } 
  } 
}