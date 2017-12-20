import React from 'react';

export class HistoryItem extends React.Component {
  render() {
    return (
      <a className="collection-item"><span className="badge">
        <p>#bu</p>
        <p>#nope</p>
      </span>
      <div>
        <div className="col-1">
          <span className="collection-date">{this.props.history.date}</span>
          <span className="collection-category">{this.props.history.category}</span>
          <span className="collection-name">{this.props.history.title}</span>
          <span className="collection-info">{this.props.history.note}</span>
        </div>
        <div className="col-2">
          <div className="btn-floating btn-large waves-effect waves-light collection-value"
            style={{backgroundColor: this.props.history.income ? "green" : "red"}}>
            <span className="collection-value" style={{fontSize: this.props.history.money.length < 6 ? "24px" :
              this.props.history.money.length < 8 ? "18px" : "14px"}}>
              {this.props.history.income ? "+" : "-"}{this.props.history.money}zł
            </span>
          </div>
        </div>
      </div></a>
    );
  }
}
