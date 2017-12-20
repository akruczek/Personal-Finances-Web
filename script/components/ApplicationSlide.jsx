import React from 'react'

export class ApplicationSlide extends React.Component {
  render() {
    return (
      <ul id="slide-out" className="side-nav">
        <li><div className="user-view">
          <div className="background" style={{backgroundColor: "#CC144A"}}>
          </div>
          <span className="white-text name">{this.props.userObject.login}</span>
          <span className="white-text email">{this.props.userObject.email}</span>
        </div></li>
        <li><a href="" className="waves-effect"><i className="material-icons">attach_money</i>Strona Główna</a></li>
        <li><a href="" className="waves-effect">Link2</a></li>
        <li><div className="divider"></div></li>
        <li><a className="subheader">Opcje/Kategorie</a></li>
        <li><a className="waves-effect" href="#!">Link3</a></li>
      </ul>
    );
  }
}
