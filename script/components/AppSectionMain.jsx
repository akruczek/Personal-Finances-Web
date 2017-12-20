import React from "react";
import {HistoryItem} from "./HistoryItem.jsx";

export class AppSectionMain extends React.Component {
  open =()=> { $("#modal1").modal("open"); }

  render() {
    console.log("History: ", this.props.opHistory);
    return (this.props.opHistory.length !== 0) && (
      <section className="operationsHistory">
         <section className="row">
          <div>
            <div className="card-panel teal">
              <a onClick={this.props.callback} className="addOperationButton btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a>
              <div className="collection">
                {this.props.opHistory.map((item) =>
                  <HistoryItem key={item.id} history={this.props.opHistory[this.props.opHistory.length-(item.id + 1)]}/>
                )}
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}
