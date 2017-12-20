import React from 'react';
import { NavLink } from 'react-router-dom';

export const ApplicationHeader =(props)=> {
  return (
    <header className="mainHeader">
      <nav>
        <div className="nav-wrapper">
          <div className="brand-logo" data-activates="slide-out" className="button-collapse" style={{cursor: "pointer", backgroundColor: "yellow", width: "0", height: "0"}}><i className="material-icons">menu</i></div>
          <a className="brand-logo brand-logo2" href={props.mainPath}>{props.userObject.login}</a>

          <h1 className="currency">
            <p><i className="material-icons">euro_symbol</i> {props.currencyEur.code}: <a>{props.EurRates.mid}</a> ({props.EurRates.effectiveDate})</p>
          </h1>
          <h1 className="currency">
            <p><i className="material-icons">attach_money</i> {props.currencyUsd.code}: <a>{props.UsdRates.mid}</a> ({props.UsdRates.effectiveDate})</p>
          </h1>

          <ul className="right hide-on-med-and-down">
            <li className="tooltip" data-title="tooltip"><a><i className="material-icons">search</i></a></li>
            <li className="tooltip" data-title="tooltip"><a><i className="material-icons">view_module</i></a></li>
            <li className="tooltip" data-title="tooltip"><a><i className="material-icons">refresh</i></a></li>
            <li className="tooltip" data-title="Wyloguj"><NavLink to="/"><i className="material-icons">exit_to_app</i></NavLink></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
