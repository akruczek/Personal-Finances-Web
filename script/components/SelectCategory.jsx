import React from 'react';
import {Input} from "react-materialize";
import {incomeCategories, expenseCategories} from "../variables/categories.jsx";

export const SelectCategoryExpense =(props)=> {
  return (
    <Input type="select" value={props.selectCategory} onChange={props.change} name="selectCategory" className="icons selectCategory">
      <option value="" disabled>Wybierz Kategorię</option>
      {incomeCategories.map(item =>
        <option value={item.id + item.value} data-icon={item.src} className="left" key={item.value}>{item.name}</option>
      )}
    </Input>
  );
}

export const SelectCategoryIncome =(props)=> {
  return (
    <Input type="select" value={props.selectCategory} onChange={props.change} name="selectCategory" className="icons selectCategory">
      <option value="" disabled>Wybierz Kategorię</option>
      {expenseCategories.map(item =>
        <option value={item.id + item.value} data-icon={item.src} className="left" key={item.value}>{item.name}</option>
      )}
    </Input>
  );
}
