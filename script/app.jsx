import React from 'react';
import ReactDOM from 'react-dom';
import	{	Router, IndexLink, IndexRoute, hashHistory }	from 'react-router';
import { HashRouter, Route, Link } from 'react-router-dom';
import {userObject} from "./main.jsx";

export class AppSectionMain extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1 style={{marginLeft: "350px"}}>Strona Główna</h1>
    );
  }
}

export class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPath: "",
      path: "",
      something: "value"
    }
  }

  componentDidMount() {
    $(".button-collapse").sideNav();
    this.setState({
      mainPath: `/#/app/${userObject.login}`,
      path: `/app/${userObject.login}`,
    });
  }

  render() {
    return userObject!==undefined ? (
      <div className="mainApp">
        <header className="mainHeader">
          <nav>
            <div className="nav-wrapper">
              <div className="brand-logo" data-activates="slide-out" className="button-collapse" style={{cursor: "pointer", backgroundColor: "yellow", width: "0", height: "0"}}><i className="material-icons">menu</i></div>
              <a className="brand-logo brand-logo2">{userObject.login}</a>
              <ul className="right hide-on-med-and-down">
                <li className="tooltip" data-title="tooltip"><a><i className="material-icons">search</i></a></li>
                <li className="tooltip" data-title="tooltip"><a><i className="material-icons">view_module</i></a></li>
                <li className="tooltip" data-title="tooltip"><a><i className="material-icons">refresh</i></a></li>
                <li className="tooltip" data-title="Wyloguj"><a data-title="tooltip" href="/"><i className="material-icons">exit_to_app</i></a></li>
              </ul>
            </div>
          </nav>
        </header>

        <ul id="slide-out" className="side-nav">
          <li><div className="user-view">
            <div className="background" style={{backgroundColor: "#CC144A"}}>
              {/* <img src="images/image.jpg"/> */}
            </div>
            {/* <a href="#" style={{backgroundColor: "blue"}}></a> */}
            <span className="white-text name">{userObject.login}</span>
            <span className="white-text email">{userObject.email}</span>
          </div></li>
          <li><a href="" className="waves-effect"><i className="material-icons">cloud</i>Link1</a></li>
          <li><a href="" className="waves-effect">Link2</a></li>
          <li><div className="divider"></div></li>
          <li><a className="subheader">Opcje/Kategorie</a></li>
          <li><a className="waves-effect" href="#!">Link3</a></li>
        </ul>

        <HashRouter>
          <div>
            <Route path={this.state.path} component={AppSectionMain}/>
          </div>
        </HashRouter>
      </div>
    ) : (
      <h1 style={{fontSize: "60px", color: "darkred", textAlign: "center"}}>You have to log in!</h1>
    );
  }
}
