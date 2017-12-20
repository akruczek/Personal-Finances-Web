import React from 'react';
import {Input} from "react-materialize";

export const SelectCategoryExpense =(props)=> {
  return (
    <Input type="select" defaultValue="" onChange={props.change} name="selectCategory" className="icons selectCategory">
      <option value="" disabled>Wybierz Kategorię</option>
      <option value="Jedzenie" data-icon="../images/catFood.png" className="left">Jedzenie</option>
      <option value="Dom" data-icon="../images/catHome.png" className="left">Dom</option>
      <option value="Transport" data-icon="../images/catTransport.png" className="left">Transport</option>
      <option value="Rozrywka" data-icon="../images/catEntertainment.png" className="left">Rozrywka</option>
      <option value="Odzież" data-icon="../images/catClothing.png" className="left">Odzież</option>
      <option value="Nauka" data-icon="../images/catStudy.png" className="left">Nauka</option>
      <option value="Zdrowie" data-icon="../images/catHealth.png" className="left">Zdrowie</option>
    </Input>
  )
}

export const SelectCategoryIncome =(props)=> {
  return (
    <Input type="select" defaultValue="" onChange={props.change} name="selectCategory" className="icons selectCategory">
      <option value="" disabled>Wybierz Kategorię</option>
      <option value="Praca" data-icon="../images/catWork.png" className="left">Praca</option>
      <option value="Hazard" data-icon="../images/catHazard.png" className="left">Hazard</option>
    </Input>
  );
}
