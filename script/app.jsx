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
import {Balance} from "./components/Balance.jsx";

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
      history: [],
      balance: 0,
      income: 0,
      expense: 0
    }
  }

  //USTAWIENIE SALDA
  setBalance =()=> {
    let newBalance=0;
    let newIncome=0; let newExpense=0;
    for (let i=0; i<this.state.history.length; i++) {
      newBalance += this.state.history[i].income ? Number(this.state.history[i].money) : Number(this.state.history[i].money * -1)
      if (this.state.history[i].income)
      (newIncome += Number(this.state.history[i].money));
      else
      (newExpense += Number(this.state.history[i].money));
    }
    this.setState({
      balance: newBalance,
      income: newIncome,
      expense: newExpense
    });
    console.log("Balance: ", this.state.balance);
  }

  //POBRANIE HISTORII OPERACJI
  getHistory =()=> {
    fetch(`http://localhost:3000/users/${userObject.id}`)
    .then(response => {return (response && response.ok) ? response.json() : "Błąd Połączenia";})
    .then(data => {
      this.setState({ history: data.operations });
    })
    .then(data => {
      this.setBalance();
      return true;
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

  //USUWANIE OPERACJI (WCZYTANIE OBECNYCH -> USUNIĘCIĘ ODPOWIEDNIEGO ELEMENTU TABLICY -> ZWRÓCENIE NOWEJ TABLICY)
  //+ SORTOWANIE TABLICY
  deleteOperation =(id)=> {
    fetch(`http://localhost:3000/users/${userObject.id}`)
    .then(response => {return (response && response.ok) ? response.json() : "Błąd Połączenia";})
    .then(data => {
      let newData = data;
      newData.operations = newData.operations.filter(item => item.id !== id);
      //SOROTWANIE
      for (let i=0; i<newData.operations.length; i++) {
        newData.operations[i].id = i;
        console.log(newData.operations[i].id, ":ID:", i);
      }

      fetch(`http://localhost:3000/users/${userObject.id}`, {
        method: "PUT",
        body: JSON.stringify(newData),
        headers: {"Content-Type" : "application/json", "Accept": "application/json"},
        dataType: "json"
      })
      .then(response => { return (response && response.ok) ? response.json() : "Błąd Połączenia"; })
      .then(data => {
        this.setHistory(newData);
        this.getHistory();
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
  }

  editOperation =(id)=> {
    console.log("edit operations " + id);
  }

  render() {
    return (userObject!==undefined) ? (
      <div className="mainApp">
        <ApplicationHeader mainPath={this.state.mainPath} userObject={userObject} currencyEur={this.state.currencyEur}
          EurRates={this.state.EurRates} currencyUsd={this.state.currencyUsd} UsdRates={this.state.UsdRates}/>

        <AddOperation isOpen={this.state.addOperation} setHistory={this.setHistory} reset={true}
          getHistory={this.getHistory}/>

        <div className="main-section">
          <AppSectionMain callback={this.openAddOpPanel} opHistory={this.state.history}
            callbackDelete={this.deleteOperation} callbackEdit={this.editOperation}/>

          <Balance balance={this.state.balance} income={this.state.income} expense={this.state.expense} history={this.state.history}/>
        </div>

        <ApplicationSlide userObject={userObject}/>

      </div>
    ) : (
      <h1 style={{fontSize: "60px", color: "darkred", textAlign: "center"}}>You have to log in!</h1>
    );
  }
}
