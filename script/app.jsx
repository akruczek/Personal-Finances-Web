import React from 'react';
import ReactDOM from 'react-dom'; //NIE POTRZEBNE [?]
import	{	Router }	from 'react-router';
import { HashRouter, BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';
import {Button, Icon, Input, Modal, Row} from 'react-materialize';
import {PropsRoute} from 'react-router-with-props';
import {userObject} from "./main.jsx";
import {AddOperation} from "./components/AddOperation.jsx";
// import deepForceUpdate from 'react-deep-force-update';
import {ApplicationHeader} from "./components/ApplicationHeader.jsx";
import {ApplicationSlide} from "./components/ApplicationSlide.jsx";
import {AppSectionMain} from "./components/AppSectionMain.jsx";

const nbpUrl = "http://api.nbp.pl/api/exchangerates/rates/a/";

export class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPath: "",
      path: "",
      addOperation: "none",
      currencyEur: {},
      EurRates: {},
      currencyUsd: {},
      UsdRates: {},
      history: []
    }
  }

  getHistory =()=> {
    fetch(`http://localhost:3000/users/${userObject.id}`)
    .then(response => {return (response && response.ok) ? response.json() : "Błąd Połączenia";})
    .then(data => {
      console.log("GetHistory: ", data.operations);
      this.setState({
        history: data.operations
      });
      render();
    })
    .catch(error => console.log(error));
  }

  componentDidMount() {
    $(".button-collapse").sideNav();
    this.setState({
      mainPath: `/#/app/${userObject.login}`,
      path: `/app/${userObject.login}`
    });
  }

  //DODAWANIE NOWEJ OPERACJI DO state'a (from AddOperations)
  setHistory =(newHistory)=> { this.setState({ history: newHistory.operations }); }

  closeWindow =()=> { this.setState({ addOperation: "none" }); }

  openAddOpPanel =()=> { this.setState({addOperation: this.state.addOperation!=="none" ? "none" : "flex"}) }

  componentWillMount() {
    this.getHistory();
    //WALUTA EURO \/
    fetch(nbpUrl + "eur/")
    .then(response => { return (response && response.ok) ? response.json() : "Błąd Połączenia (NBP api)";})
    .then(data => {
      this.setState({
        currencyEur: data,
        EurRates: data.rates[0]
      });
      console.log(this.state.currencyEur);
    })
    .catch(error => console.log(error));


    //WALUTA $ \/
    fetch(nbpUrl + "usd/")
    .then(response => { return (response && response.ok) ? response.json() : "Błąd Połączenia (NBP api)";})
    .then(data => {
      this.setState({
        currencyUsd: data,
        UsdRates: data.rates[0]
      });
    })
    .catch(error => console.log(error));
  }

  render() {
    return userObject!==undefined ? (
      <div className="mainApp">
        <AddOperation isOpen={this.state.addOperation} setHistory={this.setHistory} closeCallback={this.closeWindow}/>

        <ApplicationHeader mainPath={this.state.mainPath} userObject={userObject} currencyEur={this.state.currencyEur}
          EurRates={this.state.EurRates} currencyUsd={this.state.currencyUsd} UsdRates={this.state.UsdRates}/>

        <ApplicationSlide userObject={userObject}/>

        <BrowserRouter>
          <Switch>
            <PropsRoute path={this.state.path} callback={this.openAddOpPanel} opHistory={this.state.history} component={AppSectionMain}/>
          </Switch>
        </BrowserRouter>
      </div>
    ) : (
      <h1 style={{fontSize: "60px", color: "darkred", textAlign: "center"}}>You have to log in!</h1>
    );
  }
}
