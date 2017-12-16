import "../style/main.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import	{	Router, IndexLink, IndexRoute, hashHistory }	from 'react-router';
import { HashRouter, Route, Link } from 'react-router-dom';
import Application from "./app.jsx";

const url = "http://localhost:3000/users/";

window.location.replace("/#/login");

let isValid;

//OKNO LOGOWANIA \/
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputLogin: "",
      inputPassword: "",
      inputLoginClass: "",
      inputPasswordClass: "",
      errorMessage: ""
    }
  }

  //ZMIANY W INPUTACH
  changeHandler =(event)=> { this.setState({ [event.target.name]: event.target.value }); }

  //ZMIANA KOLORU INPUTA
  changeValid =(classType, message)=> {
    this.setState({
      inputLoginClass: classType,
      inputPasswordClass: classType,
      errorMessage: message
    });
  }

  //LOGOWANIE
  buttonLoginClick =()=> {
    fetch(url)
    .then(response => { return (response && response.ok) ? response.json() : "Błąd Połączenia"; })
    .then(data => {
      console.log(data);  //infoline
      this.LOGIN_VALID(data); })
    .catch(error => console.log(error));
  }

  //WALIDACJA LOGINU I HASŁA Z BAZĄ
  LOGIN_VALID =(response)=> {
    for (let i=0; i<response.length; i++) {
      if ((response[i].login === this.state.inputLogin || response[i].email === this.state.inputLogin) && response[i].password === this.state.inputPassword) {
        this.changeValid("valid", "");
        console.log("Przekierowywanie..."); //infoline
        // PRZEKIEROWANIE DO APLIKACJI
        // export response[i].id;
        // window.location.replace("/#/app");
        break;
      }
      else if (i === response.length-1)
        this.changeValid("invalid", "[!] Niepoprawny login lub hasło.");
    }
  }

  render() {
    return (
      <main className="login">
        <h1 id="loginHeader">Logowanie</h1>
        <form className="formLogin">
          <div className="row">
            <div className="input-field">
              <input onChange={this.changeHandler} name="inputLogin" value={this.state.inputLogin} id="inputLogin" type="text" className="validate" className={this.state.inputLoginClass}/>
              <label className="active" htmlFor="first_name2">Login</label>
            </div>
            <br />
            <div className="input-field">
              <input onChange={this.changeHandler} name="inputPassword" value={this.state.inputPassword} id="inputPassword" type="password" className="validate" className={this.state.inputPasswordClass}/>
              <label className="active" htmlFor="first_name2">Hasło</label>
            </div>
          </div>
        </form>
        <a id="buttonLogin" onClick={this.buttonLoginClick} className="waves-effect waves-light btn-large">Zaloguj</a>
        <span id="errorMessage">{this.state.errorMessage}</span>
        <div id="createAccountLink"><a href="/#/createAccount">Załóż konto za darmo!</a></div>
      </main>
    );
  }
}

//OKNO TWORZENIA NOWEGO KONTA \/
class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputLogin: "",
      inputPassword: "",
      inputEmail: "",
      inputLoginClass: "",
      inputPasswordClass: "",
      inputEmailClass: "",
      errorMessage: "",
      isValid: false
    }
  }

  //ZMIANY W INPUTACH
  changeHandler =(event)=> { this.setState({ [event.target.name]: event.target.value }); }

  //ZMIANA KOLORU INPUTA
  changeValid =(element, classType, message)=> {
    this.setState({
      [element]: classType,
      errorMessage: message
    });
  }

  //WALIDACJA LOGINU ORAZ HASŁA
  LoginValid =()=> {
    console.log("valid login"); //infoline
    if (this.state.inputLogin.length < 5 || this.state.inputLogin.length > 18 || !/^[a-zA-Z0-9- ]*$/.test(this.state.inputLogin))
      this.changeValid("inputLoginClass", "invalid", "[!] Login musi zawierać od 5 do 18 znaków oraz tylko litery i cyfry.");
    else {
      this.changeValid("inputLoginClass", "valid", "");
      this.PasswordValid(); }
  }

  PasswordValid =()=> {
    console.log("valid pass");  //infoline
    if (this.state.inputPassword.length < 5 || this.state.inputPassword.length > 18 || !/^[a-zA-Z0-9- ]*$/.test(this.state.inputPassword))
      this.changeValid("inputPasswordClass", "invalid", "[!] Hasło musi zawierać od 5 do 18 znaków oraz tylko litery i cyfry.");
    else {
      this.changeValid("inputPasswordClass", "valid", "");
      this.EmailValid(); }
  }

  EmailValid =()=> {
    console.log("valid email"); //infoline
    if (this.state.inputEmail.length < 5 || this.state.inputEmail.indexOf("@") === -1 || this.state.inputEmail.indexOf(".") == -1)
      this.changeValid("inputEmailClass", "invalid", "[!] Niepoprawny Email.");
    else {
      this.changeValid("inputEmailClass", "valid", "");
      this.DatabaseValid(); }
  }

  DatabaseValid =()=> {
    console.log("valid db");  //infoline
    fetch(url)
    .then(response => { return (response && response.ok) ? response.json() : "Błąd Połączenia"; })
    .then(data => {
      for (let i=0; i<data.length; i++) {
        if (data[i].email === this.state.email)
          this.changeValid("inputEmailClass", "invalid", "[!] Użytkownik o takim adresie e-mail już istnieje")
        else if (data[i].login === this.state.login)
          this.changeValid("inputLoginClass", "invalid", "[!] Użytkownik o takim loginie już istnieje")
        else if (i === data.length-1) {
          this.setState({
            inputLoginClass: "valid",
            inputPasswordClass: "valid",
            inputEmailClass: "valid",
            errorMessage: "[!] Pomyślnie utworzono konto"
          })
          this.CreateAccount({
            id: this.state.inputLogin,
            login: this.state.inputLogin,
            password: this.state.inputPassword,
            email: this.state.inputEmail
          }); } } })
    .catch(error => console.log(error));
  }

  CreateAccount =(newUser)=> {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {"Content-Type" : "application/json"},
      dataType: "json"})
    .then(response => response.json())
    .then(data => {console.log("Added new user: ", newUser);})
    .catch(error => console.log(error));
  }

  render() {
    return (
      <main className="login">
        <h1 id="createAccountHeader">Stwórz Konto</h1>
        <form className="formLogin">
          <div className="row">
            <div className="input-field">
              <input onChange={this.changeHandler} value={this.state.inputLogin} name="inputLogin" id="inputLogin" type="text" className="validate" className={this.state.inputLoginClass}/>
              <label className="active" htmlFor="first_name2">Login</label>
            </div>
            <br />
            <div className="input-field">
              <input onChange={this.changeHandler} value={this.state.inputPassword} name="inputPassword" id="inputPassword" type="password" className="validate" className={this.state.inputPasswordClass}/>
              <label className="active" htmlFor="first_name2">Hasło</label>
            </div>
            <br />
            <div className="input-field">
              <input onChange={this.changeHandler} value={this.state.inputEmail} name="inputEmail" id="inputEmail" type="email" className="validate" className={this.state.inputEmailClass}/>
              <label className="active" htmlFor="first_name2">E-mail</label>
            </div>
          </div>
        </form>
        <a id="buttonCreate" onClick={this.LoginValid} className="waves-effect waves-light btn-large">Utwórz Konto</a>
        <span id="errorMessage">{this.state.errorMessage}</span>
        <div id="logInLink"><a href="/#/login">Zaloguj się</a></div>
      </main>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      // <Login />
      <HashRouter history={hashHistory}>
        <div>
          <Route path="/login" component={Login} />
          <Route path="/createAccount" component={CreateAccount} />
          <Route path="/app" component={Application} />
        </div>
      </HashRouter>
    );
  }
}

//-----SCRIPT-----\\
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );


  //FUNKCJA USUWAJĄCA UŻYTKOWNIKA (PO id)
  const RemoveAccount =(id)=> {
    fetch(url + id, {method: "DELETE"})
    .then(() => {console.log("deleted user: " + id);})
    .catch(error => console.log(error));
  }
  // RemoveAccount("1");
});
