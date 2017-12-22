import React from 'react';
import {Col, Card, Row, CardPanel, Button, Input} from 'react-materialize';
import {months} from './../variables/dates.jsx';
import {incomeCategories ,expenseCategories} from './../variables/categories.jsx';

export class Balance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incomeCatSum: [],
      expenseCatSum: [],
      selectValue: "1"
    }
  }

  changeHandler =(event)=> { this.setState({ [event.target.name]: event.target.value }); this.props.checkBalances(); }

  check =()=> {this.props.checkBalances; return (this.props.history.length > 0) ? true : false; }

  componentWillMount() { this.check(); }

  render() {
    return this.check() && (
      <div className="balancePanel">
        <CardPanel className="teal cardPanel black-text">
          <div className="cardInside">
            <h2>Saldo</h2>
            <hr/>
            <div className="moneyBagImg"><img src="./../../images/moneyBag.png"></img>
            <span>{this.props.balance.toFixed(2)}zł</span>
          </div>
          <div className="balanceImg">
            <span>+{this.props.income.toFixed(2)}zł</span>
            <img src="./../../images/balanceIncome.png" />
            <img src="./../../images/balanceExpense.png"/>
            <span>-{this.props.expense.toFixed(2)}zł</span>
          </div>
          <hr/>

          <div className="categoryBalance">
            <Input type='select' value={this.state.selectValue} className="inputBalance" name="selectValue" onChange={(event) => this.changeHandler(event)}>
              <option value='1'>Wydatki</option>
              <option value='2'>Wpływy</option>
            </Input>
            {this.state.selectValue==="1" ? (incomeCategories.map((item, index) =>
              <div key={item.id} className="catImgs">
                <img src={item.src}></img>
                <span className="value" style={{color: "red"}}>-{(this.props.incomeCatSum[index])}zł</span>
                <br/>
              </div>
            )) : (
              expenseCategories.map((item, index) =>
                <div key={item.id} className="catImgs">
                  <img src={item.src}></img>
                  <span className="value" style={{color: "green"}}>+{(this.props.expenseCatSum[index])}zł</span>
                  <br/>
                </div>)
            )
            }
          </div>
        </div>
      </CardPanel>
    </div>
    );
  }
}
