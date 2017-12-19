import React from 'react';
// import ReactDOM from 'react-dom'; //NIE POTRZEBNE [?]
import	{	Router }	from 'react-router';
import { HashRouter, BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';
import Cleave from 'cleave.js/react';
import {Button, Icon, Input, Modal} from 'react-materialize';
import {userObject} from "./../main.jsx";

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
      inputMoney: ""
    };
  }

  changeHandler =(event)=> { this.setState({ [event.target.name]: event.target.value }); console.log(event.target.name + ":" + event.target.value); }

  changeHandlerRaw =(event)=> { this.setState({ [event.target.name]: event.target.rawValue }); }

  closeWindow =()=> {
    $(".addOperationSection").css("display", "none");
    //ZAMYKANIE OKNA DODAWANIA OPERACJI [!]
  }

  componentDidMount() {
    $("select").material_select();
    this.state.dateInput === "" && this.setState({dateInput: this.state.today});
  }

  render() {
    console.log(this.state);
    return (
      <section style={{display: this.props.isOpen}} className="addOperationSection">
        <div>
          <div>
            <div className="card-panel">
              <form>
                <p>
                  <input defaultChecked={true} name="group1" type="radio" id="test1" />
                  <label htmlFor="test1">Wydatek</label>
                </p>
                <p>
                  <input name="group1" type="radio" id="test2" />
                  <label htmlFor="test2">Wpływ</label>
                </p>

                <span className="dateSpan">Data:</span><br/>
                <input onChange={this.changeHandler} type="date" className="datepicker dateInput" name="dateInput" defaultValue={this.state.today} />

                  <Input type="select" defaultValue="" onChange={this.changeHandler} name="selectCategory" className="icons selectCategory">
                    <option value="" disabled>Wybierz Kategorię</option>
                    <option value="food" data-icon="../images/catFood.png" className="left">Jedzenie</option>
                    <option value="home" data-icon="../images/catHome.png" className="left">Dom</option>
                    <option value="transport" data-icon="../images/catTransport.png" className="left">Transport</option>
                    <option value="entertainment" data-icon="../images/catEntertainment.png" className="left">Rozrywka</option>
                    <option value="clothing" data-icon="../images/catClothing.png" className="left">Odzież</option>
                    <option value="study" data-icon="../images/catStudy.png" className="left">Nauka</option>
                    <option value="health" data-icon="../images/catHealth.png" className="left">Zdrowie</option>
                  </Input>

              </form>

                <section className="OperationDescription">
                  <span className="moneyValue">Kwota:</span><br/>
                  <a className="exit" onClick={this.closeWindow}><i className="material-icons">close</i></a>
                  <Cleave options={{prefix: "zł:", numeral: true, rawValueTrimPrefix: true}}
                    className="inputMoney" id="first_name2" onChange={this.changeHandlerRaw} name="inputMoney" value={this.state.inputMoney}/>
                  <br/>
                  <span>Tytuł Operacji:</span><br/>
                  <input value={this.state.inputOperationTitle} onChange={this.changeHandler} name="inputOperationTitle" id="first_name2" type="text"/>
                  <br/>
                  <span>Notatki</span><br/>
                  <textarea value={this.state.inputNotes} onChange={this.changeHandler} name="inputNotes" id="textarea1" className="materialize-textarea" data-length="70"></textarea>
                </section>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
