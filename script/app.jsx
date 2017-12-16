import React from 'react';
import ReactDOM from 'react-dom';
import	{	Router, IndexLink, IndexRoute, hashHistory }	from 'react-router';
import { HashRouter, Route, Link } from 'react-router-dom';
import {userObject} from "./main.jsx";

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      something: "value"
    }
  }

  render() {
    return userObject!==undefined ? (
      <div className="mainApp">
        <header className="mainHeader">
          <nav>
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo"><i className="material-icons">adb</i>{userObject.login}</a>
              <ul className="right hide-on-med-and-down">
                <li className="tooltip" data-title="tooltip"><a><i className="material-icons">search</i></a></li>
                <li className="tooltip" data-title="tooltip"><a><i className="material-icons">view_module</i></a></li>
                <li className="tooltip" data-title="tooltip"><a><i className="material-icons">refresh</i></a></li>
                <li className="tooltip" data-title="Wyloguj"><a data-title="tooltip" href="/"><i className="material-icons">exit_to_app</i></a></li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    ) : (
      <h1 style={{fontSize: "60px", color: "darkred", textAlign: "center"}}>You have to log in!</h1>
    );
  }
}
