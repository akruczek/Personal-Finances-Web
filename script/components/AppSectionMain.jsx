import React from "react";
import {HistoryItem} from "./HistoryItem.jsx";

export const AppSectionMain =(props)=> {
  return (props.opHistory.length !== 0) ? (
    <section className="operationsHistory">
       <section className="row">
        <div>
          <div className="card-panel teal">
            <a href="#popup1" className="addOperationButton btn-floating btn-large waves-effect waves-light"><i className="material-icons">add</i></a>
            <div className="collection">
              {props.opHistory.map((item) =>
                <HistoryItem key={item.id} history={item}
                  callbackDelete={props.callbackDelete} callbackEdit={props.callbackEdit}/>
              )}
              <a className="collection-item"><span className="badge"> </span>
                <div>
                  <div className="col-1"> <span className="collection-name">Twoje Operacje</span> </div>
                  <div className="col-2"></div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </section>
  ) : (
    <section className="operationsHistory"> <section className="row"> <div> <div className="card-panel teal">
    <a onClick={props.callback} href="#popup1" className="addOperationButton btn-floating btn-large waves-effect waves-light"><i className="material-icons">add</i></a>
    <div className="collection">
    <a className="collection-item"><span className="badge"> </span> <div>
    <div className="col-1"> <span className="collection-name">Twoje Operacje</span>
    </div> <div className="col-2"></div> </div> </a> </div> </div> </div> </section> </section>
  );
}
