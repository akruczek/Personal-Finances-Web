import React from 'react';
import ReactDOM from 'react-dom'; //NIE POTRZEBNE [?]
import {Router}	from 'react-router';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import {PropsRoute} from 'react-router-with-props';
import {userObject} from "./main.jsx";
import {AddOperation} from "./components/AddOperation.jsx";
import {Preloader} from 'react-materialize';
import {ApplicationHeader} from "./components/ApplicationHeader.jsx";
import {ApplicationSlide} from "./components/ApplicationSlide.jsx";
import {AppSectionMain} from "./components/AppSectionMain.jsx";
import {Balance} from "./components/Balance.jsx";
import {url} from "./main.jsx";
import {incomeCategories ,expenseCategories} from './variables/categories.jsx';

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
      expense: 0,
      isLoaded: false,
      isEdit: false,
      editOperationId: 9999,
      incomeCatSum: [],
      expenseCatSum: [],
      selectYear: new Date().getFullYear(),
      selectMonth: new Date().getMonth()
    }
  }

  changeHandler =(event)=> { this.setState({ [event.target.name]: Number(event.target.value) }); }

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
    shouldComponentUpdate: () => { return false; }
  }


  checkBalances =()=> {
    let newArrIncome = [];
    let newArrExpense = [];
    //WYDATKI KATEGORYCZNIE
    for (let i=0; i<incomeCategories.length; i++) {
      newArrIncome[i] = 0;
      for (let j=0; j<this.state.history.length; j++)
        (this.state.history[j].category.slice(1) === incomeCategories[i].value) && ( newArrIncome[i] += Number(this.state.history[j].money) );
      newArrIncome[i] = newArrIncome[i].toFixed(2);
    }

    //WPŁYWY KATEGORYCZNIE
    for (let i=0; i<expenseCategories.length; i++) {
      newArrExpense[i] = 0;
      for (let j=0; j<this.state.history.length; j++)
        (this.state.history[j].category.slice(1) === expenseCategories[i].value) && ( newArrExpense[i] += Number(this.state.history[j].money) );
      newArrExpense[i] = newArrExpense[i].toFixed(2);
    }

    this.setState({
      incomeCatSum: newArrIncome,
      expenseCatSum: newArrExpense,
      isLoaded: true
    });
  }

  //POBRANIE HISTORII OPERACJI + SORTOWANIE WG DATY
  getHistory =()=> {
    fetch(`${url}${userObject.id}`, {headers: {"Content-Type" : "application/json", "Accept": "application/json"}})
    .then(response => {return (response && response.ok) ? response.json() : "Błąd Połączenia";})
    .then(data => {
      this.sortHistory(data.operations);
    })
    .then(data => { this.setBalance(); })
    .then(data => { this.checkBalances(); })
    .catch(error => console.log(error));
  }

  sortHistory =(data)=> {
    let sortedData = data;
    let changed = true;
    while (changed) {
      changed = false;
      for (let i=0; i<sortedData.length-1; i++) {
        if (Number(sortedData[i].date[8] + sortedData[i].date[9]) < Number(sortedData[i+1].date[8] + sortedData[i+1].date[9])) {
          let tempVar = sortedData[i];
          sortedData[i] = sortedData[i+1];
          sortedData[i+1] = tempVar;
          changed = true;
        }
      }
    }
    this.setState({ history: sortedData });
  }

  //NAWIGACJA SIDE-OUT, USTAWIENIE URL ZGODNIE Z ZALOGOWANYM UŻYTKOWNIKIEM
  componentDidMount() {
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
    fetch(`${url}${userObject.id}`, {headers: {"Content-Type" : "application/json", "Accept": "application/json"}})
    .then(response => {return (response && response.ok) ? response.json() : "Błąd Połączenia";})
    .then(data => {
      let newData = data;
      newData.operations = newData.operations.filter(item => item.id !== id);
      //SOROTWANIE
      for (let i=0; i<newData.operations.length; i++)
        newData.operations[i].id = i;

      fetch(`${url}${userObject.id}`, {
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

  editOperation =(id)=> { this.setState({ editOperationId: id, isEdit: true }); }

  endEdit =()=> { this.setState({ isEdit: false }); }

  render() {
    return userObject!==undefined ? (
      this.state.isLoaded ? (
        <div className="mainApp">
          <ApplicationHeader mainPath={this.state.mainPath} userObject={userObject} currencyEur={this.state.currencyEur}
            EurRates={this.state.EurRates} currencyUsd={this.state.currencyUsd} UsdRates={this.state.UsdRates}/>

          <AddOperation setHistory={this.setHistory} reset={true} getHistory={this.getHistory} history={this.state.history}
            isEdit={this.state.isEdit} editOperationId={this.state.editOperationId} endEdit={this.endEdit}/>

          <div className="main-section">
            <AppSectionMain opHistory={this.state.history} change={this.changeHandler}
              year={this.state.selectYear} month={this.state.selectMonth}
              callbackDelete={this.deleteOperation} callbackEdit={this.editOperation}/>

            <Balance balance={this.state.balance} income={this.state.income} expense={this.state.expense}
              history={this.state.history} incomeCatSum={this.state.incomeCatSum} expenseCatSum={this.state.expenseCatSum}
              checkBalances={this.checkBalances}/>

          </div>

          <ApplicationSlide userObject={userObject}/>

        </div>
      ) : (
        <Preloader className="preloader" size="big" color="red"/>
      )
    ) : (
      <h1 style={{fontSize: "60px", color: "darkred", textAlign: "center"}}>You have to log in!</h1>
    );
  }
}
