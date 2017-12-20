import React from 'react';
import Cleave from 'cleave.js/react';
import {Button} from 'react-materialize';
import {userObject} from "./../main.jsx";
import {SelectCategoryExpense, SelectCategoryIncome} from "./SelectCategory.jsx";

export class AddOperation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen,
      dateInput: "",
      today: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
      inputOperationTitle: "",
      inputNotes: "",
      selectCategory: "",
      inputMoney: "",
      inputRadio: false,
      userOperationsHistory: ""
    };
  }
import
  changeHandler =(event)=> { this.setState({ [event.target.name]: event.target.value });}

  changeHandlerRaw =(event)=> { this.setState({ [event.target.name]: event.target.rawValue }); }

  changeHandlerRadio =(event)=> { this.setState({ inputRadio: event.target.id==="test1"?false:true });}

  componentDidMount() {
    $("select").material_select();
    this.state.dateInput === "" && this.setState({dateInput: this.state.today}); }

  //DODAWANIE NOWEJ OPERACJI (WCZYTANIE OBECNYCH -> DODANIE NOWEYCH -> ZWRÓCENIE NOWEJ TABLICY)
  addOperation =()=> {
    fetch(`http://localhost:3000/users/${userObject.id}`)
    .then(response => {return (response && response.ok) ? response.json() : "Błąd Połączenia";})
    .then(data=> {
      //ZMIENNA Z HISTORIĄ OPERACJI UŻYTKOWNIKA ORAZ DODANIE DO HISTORII NOWEGO OBIEKTU
      let newHistoryItem = data;
      newHistoryItem.operations.push({
        id: data.operations.length,
        date: this.state.dateInput,
        title: this.state.inputOperationTitle,
        note: this.state.inputNotes,
        category: this.state.selectCategory,
        money: this.state.inputMoney,
        income: this.state.inputRadio
      });

      fetch(`http://localhost:3000/users/${userObject.id}`, {
        method: "PUT",
        body: JSON.stringify(newHistoryItem),
        headers: {"Content-Type" : "application/json", "Accept": "application/json"},
        dataType: "json"
      })
      .then(response => { return (response && response.ok) ? response.json() : "Błąd Połączenia"; })
      .then(data => {
        console.log("DODANO NOWĄ OPERACJĘ: ", newHistoryItem);
        this.props.setHistory(newHistoryItem);  //app.jsx >callback
        this.props.closeCallback();             //app.jsx >callback
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
  }

  render() {
    return (
      <section style={{display: this.props.isOpen}} className="addOperationSection">
        <div>
          <div>
            <div className="card-panel">
              <form>
                <p>
                  <input defaultChecked={true} onClick={this.changeHandlerRadio} name="group1" type="radio" id="test1" />
                  <label htmlFor="test1">Wydatek</label>
                </p>
                <p>
                  <input name="group1" onClick={this.changeHandlerRadio} type="radio" id="test2" />
                  <label htmlFor="test2">Wpływ</label>
                </p>

                <span className="dateSpan">Data:</span><br/>
                <input onChange={this.changeHandler} type="date" className="datepicker dateInput" name="dateInput" defaultValue={this.state.today} />

                {!this.state.inputRadio ?
                ( <SelectCategoryExpense change={this.changeHandler}/> )
                  :
                ( <SelectCategoryIncome change={this.changeHandler}/> )}

              </form>

                <section className="OperationDescription">
                  <span className="moneyValue">Kwota:</span><br/>
                  <a className="exit" onClick={this.props.closeCallback}><i className="material-icons">close</i></a>
                  <Cleave options={{prefix: "zł:", numeral: true, rawValueTrimPrefix: true}}
                    className="inputMoney" id="first_name2" onChange={this.changeHandlerRaw} name="inputMoney" value={this.state.inputMoney}/>
                  <br/>
                  <span>Tytuł Operacji:</span><br/>
                  <input value={this.state.inputOperationTitle} onChange={this.changeHandler} name="inputOperationTitle" id="first_name2" type="text"/>
                  <br/>
                  <span>Notatki</span><br/>
                  <textarea maxLength={70} value={this.state.inputNotes} onChange={this.changeHandler} name="inputNotes" id="textarea1" className="materialize-textarea" data-length="70"></textarea>

                  <Button onClick={this.addOperation} style={{zIndex: 3}} floating large className='red addOpBtn' waves='light' icon='add'/>
                </section>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
