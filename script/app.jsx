import React from 'react';
import ReactDOM from 'react-dom'; //NIE POTRZEBNE [?]
import {Router}	from 'react-router';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import {PropsRoute} from 'react-router-with-props';
import {userObject} from "./main.jsx";
import {AddOperation} from "./components/AddOperation.jsx";
import {ApplicationHeader} from "./components/ApplicationHeader.jsx";
import {ApplicationSlide} from "./components/ApplicationSlide.jsx";
import {AppSectionMain} from "./components/AppSectionMain.jsx";

const nbpUrl = "http://api.nbp.pl/api/exchangerates/rates/a/";

export class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: "",
      currencyEur: {},
      EurRates: {},
      currencyUsd: {},
      UsdRates: {},
      history: []
    }
  }

  //POBRANIE HISTORII OPERACJI
  getHistory =()=> {
    fetch(`http://localhost:3000/users/${userObject.id}`)
    .then(response => {return (response && response.ok) ? response.json() : "Błąd Połączenia";})
    .then(data => {
      this.setState({ history: data.operations });
    }).catch(error => console.log(error));
  }

  //NAWIGACJA SIDE-OUT, USTAWIENIE URL ZGODNIE Z ZALOGOWANYM UŻYTKOWNIKIEM
  componentDidMount() {
    $(".button-collapse").sideNav();
    this.setState({ path: `/app/${userObject.login}` });
  }

  //DODAWANIE NOWEJ OPERACJI DO state'a (from AddOperations)
  setHistory =(newHistory)=> { this.setState({ history: newHistory.operations }); }

  componentWillMount() {
    this.getHistory();
    //POBRANIE WALUTY EURO (NBP API)
    fetch(nbpUrl + "eur/")
    .then(response => { return (response && response.ok) ? response.json() : "Błąd Połączenia (NBP api)";})
    .then(data => {
      this.setState({
        currencyEur: data,
        EurRates: data.rates[0]
      });
    }).catch(error => console.log(error));

    //POBRANIE WALUTY DOLAR (NBP API)
    fetch(nbpUrl + "usd/")
    .then(response => { return (response && response.ok) ? response.json() : "Błąd Połączenia (NBP api)";})
    .then(data => {
      this.setState({
        currencyUsd: data,
        UsdRates: data.rates[0]
      });
    }).catch(error => console.log(error));
  }

  render() {
    return userObject!==undefined ? (
      <div className="mainApp">
        <AddOperation isOpen={this.state.addOperation} setHistory={this.setHistory} closeCallback={this.openAddOpPanel} reset={true}/>

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
