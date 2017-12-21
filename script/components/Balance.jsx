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
            <span>{props.balance}zł</span>
          </div>
          <div className="balanceImg">
              <span>{props.income}zł</span>
              <img src="./../../images/balanceIncome.png" />
            <img src="./../../images/balanceExpense.png"/>
              <span>-{props.expense}zł</span>
          </div>
        </div>
			</CardPanel>
    </div>
  );
}
