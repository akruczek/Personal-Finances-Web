import React from 'react';
import {Col, Card, Row, CardPanel, Button} from 'react-materialize';

export const Balance =(props)=> {
  return (
    <div className="balancePanel">
			<CardPanel className="teal cardPanel black-text">
        <div className="cardInside">
          <h2>Saldo</h2>
          <hr/>
          <div className="moneyBagImg"><img src="./../../images/moneyBag.png"></img>
            <span>{props.balance.toFixed(2)}zł</span>
          </div>
          <div className="balanceImg">
            <span>+{props.income.toFixed(2)}zł</span>
              <img src="./../../images/balanceIncome.png" />
              <img src="./../../images/balanceExpense.png"/>
            <span>-{props.expense.toFixed(2)}zł</span>
          </div>

          {/* WYDATKI NA KAŻDY MIESIĄC */}
          {props.history.map(item => <h3>{item.money}, {String(item.income)}</h3>)}
        </div>
			</CardPanel>
    </div>
  );
}
