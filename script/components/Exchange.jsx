import React from 'react';
import {Input, Icon} from 'react-materialize';
import Cleave from 'cleave.js/react';

export class Exchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstInputEur: 0.00,
      secondInputEur: 0.00,
      firstInputUsd: 0.00,
      secondInputUsd: 0.00
    }
  }

  changeHandler =(event)=> {
    let name = event.target.name;
    this.setState({ [name]: event.target.rawValue }, () => {
      this.setState({
        firstInputEur: name!="firstInputEur" ? Number(this.state.secondInputEur) / Number(this.props.EurRates.mid) : this.state.firstInputEur,
        secondInputEur: name!="secondInputEur" ? Number(this.state.firstInputEur) * Number(this.props.EurRates.mid) : this.state.secondInputEur,
        firstInputUsd: name!="firstInputUsd" ? Number(this.state.secondInputUsd) / Number(this.props.UsdRates.mid) : this.state.firstInputUsd,
        secondInputUsd: name!="secondInputUsd" ? Number(this.state.firstInputUsd) * Number(this.props.UsdRates.mid) : this.state.secondInputUsd,
      });
    });
  }

  render() {
    return (
      <div id="exchange" className="overlay">
        <div className="popup">
          <h2>Wymiany Walut</h2>
          <a className="close" href="#">&times;</a>
          <div className="content">
            <span>Średni kurs <a>Euro</a> na dzień {this.props.EurRates.effectiveDate}: <a>{Number(this.props.EurRates.mid).toFixed(2)}</a></span>
            <span>Średni kurs <a>Dolara Amerykańskiego</a> na dzień {this.props.UsdRates.effectiveDate}: <a>{Number(this.props.UsdRates.mid).toFixed(2)}</a></span>
            <hr/>
            <div className="CleavesContainer">
              <Cleave options={{prefix: "zł:", numeral: true, rawValueTrimPrefix: true}} className="firstInputCurrencyEur"
                onChange={this.changeHandler} name="firstInputEur" value={this.state.firstInputEur}/>

              <Icon large>swap_horiz</Icon>

              <Cleave options={{prefix: "€:", numeral: true, rawValueTrimPrefix: true}} className="secondInputCurrencyEur"
                onChange={this.changeHandler} name="secondInputEur" value={this.state.secondInputEur}/>
            </div>
            <hr/>
            <div className="CleavesContainer">
              <Cleave options={{prefix: "zł:", numeral: true, rawValueTrimPrefix: true}} className="firstInputCurrencyUsd"
                onChange={this.changeHandler} name="firstInputUsd" value={this.state.firstInputUsd}/>

              <Icon large>swap_horiz</Icon>

              <Cleave options={{prefix: "$:", numeral: true, rawValueTrimPrefix: true}} className="secondInputCurrencyUsd"
                onChange={this.changeHandler} name="secondInputUsd" value={this.state.secondInputUsd}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
