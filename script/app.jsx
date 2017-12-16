// import "../style/main.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import	{	Router, IndexLink, IndexRoute, hashHistory }	from 'react-router';
import { HashRouter, Route, Link } from 'react-router-dom';

export default class Application extends React.Component {
  render() {
    console.log("Welcome in app.jsx!");
    return (
      <h1>Ubi qui amet fugiat irure et anim
        eiusmod qui probant. Quid quo possumus.
        Hic expetendis firmissimum, sed quorum
        amet ab commodo. Ubi admodum e nostrud
        se eiusmod duis constias singulis,
        vidisse esse vidisse sed te vidisse
        familiaritatem.</h1>
    );
  }
}

//
// document.addEventListener("DOMContentLoaded", () => {
//   ReactDOM.render(
//     <HashRouter history={hashHistory}>
//       <div>
//         <Route path="/app" component={App} />
//       </div>
//     </HashRouter>,
//     document.getElementById('app')
//   );
// });
