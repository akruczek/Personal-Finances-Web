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

            {/* <Cleave options={{prefix: "zł:", numeral: true, rawValueTrimPrefix: true}}
              className="inputMoney" id="first_name1" onChange={this.changeHandlerRaw} name="inputMoney"
              value={this.state.inputMoney}/> */}

            {/* <Input type="select" value={props.selectCategory} onChange={props.change} name="selectCategory" className="icons selectCategory">
              <option value="" disabled>Wybierz Kategorię</option>
              {incomeCategories.map(item =>
                <option value={item.id + item.value} data-icon={item.src} className="left" key={item.value}>{item.name}</option>
              )}
            </Input> */}

            {/* <span>Nowe Hasło:</span>
            <Input type="password" className="newPassword" name="newPassword" onChange={this.changeHandler} value={this.state.newPassword}/>
            <span>Potwierdź Hasło:</span>
            <Input type="password" className="confirmPassword" name="confirmPassword" onChange={this.changeHandler} value={this.state.confirmPassword}/>
            <Button onClick={() => {this.changePassword();}} large className="changePasswordButton" waves='light'>
              {(this.state.newPassword === this.state.confirmPassword && this.state.newPassword.length > 5 && /^[a-zA-Z0-9- ]*$/.test(this.state.newPassword)) ? <a href="#">Zatwierdź</a> : <a href="#changePassword">Zatwierdź</a>}
            </Button> */}
          </div>
        </div>
      </div>
    );
  }
}
