import React from 'react';
import ReactDOM from 'react-dom'; //NIE POTRZEBNE [?]
import	{	Router }	from 'react-router';
import { HashRouter, BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';
import {PropsRoute} from 'react-router-with-props';
import {userObject} from "./main.jsx";
import {AddOperation} from "./components/AddOperation.jsx";

const nbpUrl = "http://api.nbp.pl/api/exchangerates/rates/a/";

export class AppSectionMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smth: ""
    }
  }

  render() {
    return (
      <section className="operationsHistory">
         <section className="row">
          <div>
            <div className="card-panel teal">
              <a onClick={this.props.callback} className="addOperationButton btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a>
              <div className="collection">

                <a className="collection-item"><span className="badge">
                  <p>#bu</p>
                  <p>#nope</p>
                </span>
                <div>
                  <div className="col-1">
                    <span className="collection-date">17-12-2017</span>
                    <span className="collection-category">Rachunki</span>
                    <span className="collection-name">Opłaty Miesięczne</span>
                    <span className="collection-info">Dodatkowe Info</span>
                  </div>
                  <div className="col-2">
                    <div className="btn-floating btn-large waves-effect waves-light red collection-value"><span className="collection-value">-130zł</span></div>
                  </div>
                </div></a>

                <a className="collection-item"><span className="badge">
                  <p>#work</p>
                  <p>#hajs</p>
                </span>
                <div>
                  <div className="col-1">
                    <span className="collection-date">19-12-2017</span>
                    <span className="collection-category">Praca</span>
                    <span className="collection-name">Wypłata Grudzień</span>
                    <span className="collection-info">Dodatkowe Info</span>
                  </div>
                  <div className="col-2">
                    <div className="btn-floating btn-large waves-effect waves-light green collection-value"><span className="collection-value">+3500zł</span></div>
                  </div>
                </div></a>

                <a className="collection-item"><span className="badge">Typ</span>Operacja2</a>
                <a className="collection-item"><span className="badge">Typ</span>Operacja3</a>
                <a className="collection-item"><span className="badge">Typ</span>Operacja4</a>
                <a className="collection-item"><span className="new badge blue">4</span>Operacja5</a>
                <a className="collection-item"><span className="new badge red">4</span>Operacja6</a>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPath: "",
      path: "",
      addOperation: "none",
      currencyEur: {},
      EurRates: {}
    }
  }

  componentDidMount() {
    $(".button-collapse").sideNav();
    this.setState({
      mainPath: `/#/app/${userObject.login}`,
      path: `/app/${userObject.login}`
    });
  }

  openAddOpPanel =()=> {
    console.log("open");
    this.setState({addOperation: this.state.addOperation!=="none" ? "none" : "flex"})
  }

  getCurrency =()=> {
    fetch(nbpUrl + "eur/")
    .then(response => { return (response && response.ok) ? response.json() : "Błąd Połączenia (NBP api)";})
    .then(data => {
      this.setState({
        currencyEur: data
      }, console.log(this.state.currencyEur));
    })
    .catch(error => console.log(error));
  }

  componentWillMount() {
    fetch(nbpUrl + "eur/")
    .then(response => { return (response && response.ok) ? response.json() : "Błąd Połączenia (NBP api)";})
    .then(data => {
      this.setState({
        currencyEur: data,
        EurRates: data.rates[0]
      }, console.log(this.state.currencyEur));
    })
    .catch(error => console.log(error));
  }

  render() {
    console.log(this.state.currencyEur);
    console.log(this.state.EurRates);
    return userObject!==undefined ? (
      <div className="mainApp">
        <AddOperation isOpen={this.state.addOperation}/>
        <header className="mainHeader">
          <nav>
            <div className="nav-wrapper">
              <div className="brand-logo" data-activates="slide-out" className="button-collapse" style={{cursor: "pointer", backgroundColor: "yellow", width: "0", height: "0"}}><i className="material-icons">menu</i></div>
              <a className="brand-logo brand-logo2" href={this.state.mainPath}>{userObject.login}</a>

              <h1 className="currency">
                <p>Kurs {this.state.currencyEur.currency}: <a>{this.state.EurRates.mid}</a> ({this.state.EurRates.effectiveDate})</p>
              </h1>

              <ul className="right hide-on-med-and-down">
                <li className="tooltip" data-title="tooltip"><a><i className="material-icons">search</i></a></li>
                <li className="tooltip" data-title="tooltip"><a><i className="material-icons">view_module</i></a></li>
                <li className="tooltip" data-title="tooltip"><a><i className="material-icons">refresh</i></a></li>
                <li className="tooltip" data-title="Wyloguj"><NavLink to="/"><i className="material-icons">exit_to_app</i></NavLink></li>
              </ul>
            </div>
          </nav>
        </header>

        <ul id="slide-out" className="side-nav">
          <li><div className="user-view">
            <div className="background" style={{backgroundColor: "#CC144A"}}>
            </div>
            <span className="white-text name">{userObject.login}</span>
            <span className="white-text email">{userObject.email}</span>
          </div></li>
          <li><a href="" className="waves-effect"><i className="material-icons">attach_money</i>Strona Główna</a></li>
          <li><a href="" className="waves-effect">Link2</a></li>
          <li><div className="divider"></div></li>
          <li><a className="subheader">Opcje/Kategorie</a></li>
          <li><a className="waves-effect" href="#!">Link3</a></li>
        </ul>

        <BrowserRouter>
          <Switch>
            <PropsRoute path={this.state.path} callback={this.openAddOpPanel} component={AppSectionMain}/>
          </Switch>
        </BrowserRouter>
      </div>
    ) : (
      <h1 style={{fontSize: "60px", color: "darkred", textAlign: "center"}}>You have to log in!</h1>
    );
  }
}
