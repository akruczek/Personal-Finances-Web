import React from 'react';
// import ReactDOM from 'react-dom'; //NIE POTRZEBNE [?]
import	{	Router, IndexLink, IndexRoute }	from 'react-router';
import { HashRouter, BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';
import {userObject} from "./../main.jsx";

export class AddOperation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen
    }
  }

  closeWindow =()=> {
    $(".addOperationSection").css("display", "none");
    //ZAMYKANIE OKNA DODAWANIA OPERACJI [!]
  }

  render() {
    return (
      <section style={{display: this.props.isOpen}} className="addOperationSection">
        <div>
          <div>
            <div className="card-panel">
              <a className="exit" onClick={this.closeWindow}><i className="material-icons">close</i></a>
              <form>
                <p>
                  <input defaultChecked={true} name="group1" type="radio" id="test1" />
                  <label htmlFor="test1">Wydatek</label>
                </p>
                <p>
                  <input name="group1" type="radio" id="test2" />
                  <label htmlFor="test2">Wpływ</label>
                </p>
              </form>
              <span className="dateSpan">Data:</span><br/>
              <input type="text" className="dateInput"/>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
