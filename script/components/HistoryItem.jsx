import React from 'react';

export const HistoryItem =(props)=> {
  return (
    <a className="collection-item"><span className="badge">
      <p>#bu</p>
      <p>#nope</p>
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
    </div></a>
  );
}
