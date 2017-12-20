import React from "react";
import {HistoryItem} from "./HistoryItem.jsx";

export const AppSectionMain =(props)=> {
  return (props.opHistory.length !== 0) && (
    <section className="operationsHistory">
       <section className="row">
        <div>
          <div className="card-panel teal">
            <a onClick={props.callback} className="addOperationButton btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a>
            <div className="collection">
              {props.opHistory.map((item) =>
                <HistoryItem key={item.id} history={props.opHistory[props.opHistory.length-(item.id + 1)]}/>
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
