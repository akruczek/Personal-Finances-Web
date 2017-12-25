import React from 'react';
import Cleave from 'cleave.js/react';
import {Button, Icon} from 'react-materialize';
import {userObject} from "./../main.jsx";
import {SelectCategoryExpense, SelectCategoryIncome} from "./SelectCategory.jsx";
import {incomeCategories, expenseCategories} from "../variables/categories.jsx";
import {url} from "./../main.jsx";

export class AddOperation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
      dateInput: "",
      inputOperationTitle: "",
      inputNotes: "",
      selectCategory: "",
      inputMoney: "",
      inputRadio: false,
      userOperationsHistory: "",
      incomeSum: 0,
      expenseSum: 0,
      iconSrc: ""
    };
  }

  changeHandler =(event)=> { this.setState({ [event.target.name]: event.target.value });}

  changeHandlerSelect =(event)=> {
    this.setState({
      [event.target.name]: !this.state.inputRadio ? incomeCategories[Number(event.target.value[0])].id + incomeCategories[Number(event.target.value[0])].value : incomeCategories[Number(event.target.value[0])].id + expenseCategories[Number(event.target.value[0])].value,
      iconSrc: !this.state.inputRadio ? incomeCategories[Number(event.target.value[0])].src : expenseCategories[Number(event.target.value[0])].src
    });
  }

  changeHandlerRaw =(event)=> { this.setState({ [event.target.name]: event.target.rawValue }); }

  changeHandlerRadio =(event)=> { this.setState({ inputRadio: event.target.id==="test1"?false:true });}

  componentDidMount() {
    $("select").material_select();
    this.state.dateInput === "" && this.setState({dateInput: this.state.today, isLoaded: false});
  }

  resetOptions =()=> {
    this.setState({
      inputMoney: "",
      dateInput: this.state.today,
      inputOperationTitle: "",
      inputNotes: "",
      selectCategory: "",
      inputRadio: false
    });
  }

  //DODAWANIE NOWEJ OPERACJI (WCZYTANIE OBECNYCH -> DODANIE NOWYCH -> ZWRÓCENIE NOWEJ TABLICY)
  //+ EDYCJA (PODMIANA ODPOWIEDNIEGO ELEMENTU TABLICY)
  addOperation =()=> {
    fetch(`${url}${userObject.id}`, {headers: {"Content-Type" : "application/json", "Accept": "application/json"}})
    .then(response => {return (response && response.ok) ? response.json() : "Błąd Połączenia";})
    .then(data=> {
      //ZMIENNA Z HISTORIĄ OPERACJI UŻYTKOWNIKA ORAZ DODANIE DO HISTORII NOWEGO OBIEKTU
      let newHistoryItem = data;
      if(this.props.isEdit) {
        newHistoryItem.operations[this.props.editOperationId] = {
          id: this.props.editOperationId,
          date: this.state.dateInput,
          title: this.state.inputOperationTitle,
          note: this.state.inputNotes,
          category: this.state.selectCategory,
          money: this.state.inputMoney,
          income: this.state.inputRadio,
          src: this.state.iconSrc
        }
      }
      else {
        newHistoryItem.operations.push({
          id: data.operations.length,
          date: this.state.dateInput,
          title: this.state.inputOperationTitle,
          note: this.state.inputNotes,
          category: this.state.selectCategory,
          money: this.state.inputMoney,
          income: this.state.inputRadio,
          src: this.state.iconSrc
        });
      }

      fetch(`${url}${userObject.id}`, {
        method: "PUT",
        body: JSON.stringify(newHistoryItem),
        headers: {"Content-Type" : "application/json", "Accept": "application/json"},
        dataType: "json"
      })
      .then(response => { return (response && response.ok) ? response.json() : "Błąd Połączenia"; })
      .then(data => {
        this.props.setHistory(newHistoryItem);  //app.jsx >callback
        this.props.getHistory();  //app.jsx >callback
        window.location.replace("#");
        this.resetOptions();
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
  }

  //USTAWIANIE DOMYŚLNYCH WARTOŚCI INPUTA PODCZAS EDYCJI
  setEdit =()=> {
    let tempId = 0;
    for (let i=0; i<this.props.history.length; i++) {
      if (this.props.history[i].id === this.props.editOperationId) {
        tempId = i;
        break;
      }
    }

    let tempSelectCategory = "";
    if (!this.props.history[tempId].income) {
      for (let i=0; i<incomeCategories.length; i++) {
        if (incomeCategories[i].name === this.props.history[tempId].category) {
          tempSelectCategory = i + incomeCategories[i].value; break;
        }
      }
    }
    else {
      for (let i=0; i<expenseCategories.length; i++) {
        if (expenseCategories[i].name === this.props.history[tempId].category) {
          tempSelectCategory = i + expenseCategories[i].value; break;
        }
      }
    }

    this.setState({
      dateInput: this.props.history[tempId].date,
      inputOperationTitle: this.props.history[tempId].title,
      inputNotes: this.props.history[tempId].note,
      selectCategory: tempSelectCategory,
      inputMoney: this.props.history[tempId].money,
      inputRadio: this.props.history[tempId].income
    });
    return true;
  }

  componentWillReceiveProps =()=> {
    setTimeout(()=>{ this.props.isEdit ? this.setEdit() : this.resetOptions(); }, 120);
  }

  render() {
    return (
      <div id="popup1" className="overlay">
        <div className="popup">
          {this.props.isEdit ? <h2>Edytuj operację</h2> : <h2>Dodaj nową operację</h2>}
          <a className="close" href="#" onClick={this.props.endEdit}>&times;</a>
          <div className="content">
            <section className="addOperationSection">
              <form>
                <p>
                  <input checked={!this.state.inputRadio} onChange={this.changeHandlerRadio} name="group1" type="radio" id="test1" />
                  <label htmlFor="test1">Wydatek</label>
                </p>
                <p>
                  <input checked={this.state.inputRadio} name="group1" onChange={this.changeHandlerRadio} type="radio" id="test2" />
                  <label htmlFor="test2">Wpływ</label>
                </p>

                {!this.state.inputRadio ?
                  ( <SelectCategoryExpense change={this.changeHandlerSelect} inputRadio={this.state.inputRadio}
                    selectCategory={this.state.selectCategory}/> )
                  :
                  ( <SelectCategoryIncome change={this.changeHandlerSelect} inputRadio={this.state.inputRadio}
                    selectCategory={this.state.selectCategory}/> )}

                <span className="dateSpan">Data:</span><br/>
                <input onChange={this.changeHandler} type="date" className="datepicker dateInput" name="dateInput"
                  value={this.state.dateInput} />
              </form>

            <section className="OperationDescription">
              <span className="moneyValue">Kwota:</span><br/>
              <Cleave options={{prefix: "zł:", numeral: true, rawValueTrimPrefix: true}}
                className="inputMoney" id="first_name2" onChange={this.changeHandlerRaw} name="inputMoney"
                value={this.state.inputMoney}/>

                <br/>
                <span>Tytuł Operacji:</span><br/>
                <input value={this.state.inputOperationTitle}
                  onChange={this.changeHandler} name="inputOperationTitle" id="first_name2" type="text"/>
                <br/>
                <span>Notatki</span><br/>
                <textarea maxLength={70} value={this.state.inputNotes}
                  onChange={this.changeHandler} name="inputNotes" id="textarea1" className="materialize-textarea" data-length="70"></textarea>

                <Button onClick={() => {this.addOperation();}}
                  href="#" large className="addOpBtn" waves='light'>{this.props.isEdit ? <a href="#">Edytuj</a> : <a href="#">Dodaj</a>}<Icon left>playlist_add</Icon></Button>
              </section>
            </section>
          </div>
        </div>
      </div>
    );
  }
}
