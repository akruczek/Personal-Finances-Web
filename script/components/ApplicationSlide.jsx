import React from 'react';
import { NavLink } from 'react-router-dom';

export const ApplicationSlide =(props)=> {
  return (
    <ul id="slide-out" className="side-nav">
      <li><div className="user-view">
        <div className="background" style={{backgroundColor: "#CC144A"}}>
        </div>
        <span className="white-text name">{props.userObject.login}</span>
        <span className="white-text email">{props.userObject.email}</span>
      </div></li>
      <li><a href="" className="waves-effect"><i className="material-icons">settings_applications</i>Ustawienia</a></li>
      <li><NavLink to="/"><i className="material-icons">exit_to_app</i>Wyloguj</NavLink></li>
      <li><div className="divider"></div></li>
      <li><a className="subheader">Opcje/Kategorie</a></li>
      <li><a className="waves-effect" href="#!">Link3</a></li>
    </ul>
  );
}
