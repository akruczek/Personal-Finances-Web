import React from 'react';
import {Button} from 'react-materialize';
import {incomeCategories, expenseCategories} from "../variables/categories.jsx";

export const HistoryItem =(props)=> {
  return (
    <span className="collection-item"><span className="badge">
        <p><a href="#popup1"><Button floating className='green' waves='light' icon='edit' onClick={() => props.callbackEdit(props.history.id)}></Button></a></p>
        <p><Button floating className='blue' waves='light' icon='delete' onClick={() => props.callbackDelete(props.history.id)}/></p>
      </span>
      <div>
        <div className="col-1">
          <span className="collection-date">{props.history.date}</span>
          {!props.history.income ? (
            incomeCategories.map(item => {
              if (item.id == props.history.category[0])
              return <span key={item.name} className="collection-name">{item.name}</span>
            })
          ) : (
            expenseCategories.map(item => {
              if (item.id == props.history.category[0])
              return <span key={item.name} className="collection-name">{item.name}</span>
            })
          )
          }
          <span className="collection-name">{props.history.title}</span>
          <span className="collection-info">{props.history.note}</span>
        </div>
        <img src={props.history.src} className="historyIcon" style={{height: "64px"}}/>
        <div className="col-2">
          <div className="btn-floating btn-large waves-effect waves-light collection-value"
            style={{backgroundColor: props.history.income ? "green" : "red"}}>
            <span className="collection-value" style={{fontSize: props.history.money.length < 6 ? "24px" :
              props.history.money.length < 8 ? "18px" : "14px"}}>
              {props.history.income ? "+" : "-"}{props.history.money}zł
            </span>
          </div>
        </div>
      </div>
    </span>
  );
}
