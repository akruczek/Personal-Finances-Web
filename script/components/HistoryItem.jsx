import React from 'react';
import {Button} from 'react-materialize';

export const HistoryItem =(props)=> {
  return props.history ? (
    <a className="collection-item"><span className="badge">
        <p><Button floating className='green' waves='light' icon='edit' onClick={() => props.callbackEdit(props.history.id)}/></p>
        <p><Button floating className='blue' waves='light' icon='delete' onClick={() => props.callbackDelete(props.history.id)}/></p>
      </span>
      <div>
        <div className="col-1">
          <span className="collection-date">{props.history.date}</span>
          <span className="collection-category">{props.history.category}</span>
          <span className="collection-name">{props.history.title}</span>
          <span className="collection-info">{props.history.note}</span>
        </div>
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
    </a>
  ) : <a></a>;
}
