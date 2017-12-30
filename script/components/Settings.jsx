import React from 'react';
import {Button, Input} from 'react-materialize';
import {url, userObject} from './../main.jsx';

export class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmPassword: ""
    }
  }

  changeHandler =(event)=> { this.setState({ [event.target.name]: event.target.value }); }

  Code =(string)=> {
    let result = "";
    for (let i=0; i<string.length; i++)
      result += String.fromCharCode(string.charCodeAt(i) + 10);
    return result;
  }

  changePassword =()=> {
    if (this.state.newPassword === this.state.confirmPassword && this.state.newPassword.length > 5 && /^[a-zA-Z0-9- ]*$/.test(this.state.newPassword)) {
      fetch(`${url}${userObject.id}`, {method: "GET", headers: {"Content-Type" : "application/json", "Accept": "application/json"}})
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let newData = data;
        newData.password = this.Code(this.state.confirmPassword);
        fetch(`${url}${userObject.id}`, {method: "PUT", body: JSON.stringify(newData), headers: {"Content-Type" : "application/json", "Accept": "application/json", "dataType": "json"}})
        .then(response => response.json())
        .then(data => {console.log(data);}).catch(error => console.log(error));
      }).catch(error => console.log(error)); }
    else {
      console.log("nieprawidłowe hasło"); }
  }

  render() {
    console.log(this.state.confirmPassword);
    return (
      <div id="changePassword" className="overlay">
        <div className="popup">
          <h2>Zmień Hasło</h2>
          <a className="close" href="#" onClick={this.props.endEdit}>&times;</a>
          <div className="content">
            <span>Nowe Hasło:</span>
            <Input type="password" className="newPassword" name="newPassword" onChange={this.changeHandler} value={this.state.newPassword}/>
            <span>Potwierdź Hasło:</span>
            <Input type="password" className="confirmPassword" name="confirmPassword" onChange={this.changeHandler} value={this.state.confirmPassword}/>
            <Button onClick={() => {this.changePassword();}} large className="changePasswordButton" waves='light'>
              {(this.state.newPassword === this.state.confirmPassword && this.state.newPassword.length > 5 && /^[a-zA-Z0-9- ]*$/.test(this.state.newPassword)) ? <a href="#">Zatwierdź</a> : <a href="#changePassword">Zatwierdź</a>}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
