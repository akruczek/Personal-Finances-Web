import React from 'react';
import { NavLink } from 'react-router-dom';

export class ApplicationHeader extends React.Component {
  componentDidMount() {
    setTimeout(() => { $(".button-collapse").sideNav({closeOnClick: true}); }, 50);
  }

  render() {
    return (
      <header className="mainHeader">
        <nav>
          <div className="nav-wrapper">
            <a className="button-collapse brand-logo" data-activates="slide-out"
              style={{cursor: "pointer", backgroundColor: "yellow", width: "0", height: "0", display: "block"}}>
              <i className="material-icons">menu</i>
            </a>
            <a className="brand-logo brand-logo2" href={this.props.mainPath}>{this.props.userObject.login}</a>

            <h1 className="currency">
              <p><i className="material-icons">euro_symbol</i> {this.props.currencyEur.code}: <a>{this.props.EurRates.mid}</a> ({this.props.EurRates.effectiveDate})</p>
            </h1>
            <h1 className="currency">
              <p><i className="material-icons">attach_money</i> {this.props.currencyUsd.code}: <a>{this.props.UsdRates.mid}</a> ({this.props.UsdRates.effectiveDate})</p>
            </h1>

            <ul className="right hide-on-med-and-down">
              <li className="tooltip" data-title="Wyloguj"><NavLink to="/"><i className="material-icons">exit_to_app</i></NavLink></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
