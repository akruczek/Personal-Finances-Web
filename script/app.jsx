// import "../style/main.scss";
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
    console.log("Welcome in app " + userObject.login);
    return (
      <h1>{userObject.login}</h1>
    );
  }
}
