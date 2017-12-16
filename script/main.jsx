import "../style/main.scss";
import React from 'react';
import ReactDOM from 'react-dom';

const url = "http://localhost:3000/users/";

const buttonLogin = $("#buttonLogin");
const buttonCreate = $("#buttonCreate");
const inputLogin = $("#inputLogin");
const inputPassword = $("#inputPassword");
const inputEmail = $("#inputEmail");
const errorMessage = $("#errorMessage");
const createAccountLink = $("#createAccountLink");
let isValid;

$(() => {
  console.log("test");

  //LOGOWANIE \/

  //WALIDACJA LOGINU I HASŁA Z BAZĄ
  function LOGIN_VALID(response) {
    for (let i=0; i<response.length; i++) {
      if ((response[i].login === inputLogin.val() || response[i].email === inputLogin.val()) && response[i].password === inputPassword.val()) {
        console.log("poprawny login oraz hasło.");  //infoline
        inputLogin.addClass("valid"); inputLogin.removeClass("invalid");
        inputPassword.addClass("valid"); inputPassword.removeClass("invalid");
        errorMessage.text("");
        //PRZEKIEROWANIE DO APLIKACJI
        break;
      }
      else {
        if (i === response.length-1) {
          console.log("[!] Niepoprawny login lub hasło.");  //infoline
          inputLogin.addClass("invalid");
          inputPassword.addClass("invalid");
          errorMessage.text("[!] Niepoprawny login i/lub hasło.");
        }
      }
    }
  }

  //LOGOWANIE
  buttonLogin.on("click", () => {
    fetch(url)
    .then(response => { return (response && response.ok) ? response.json() : "Błąd Połączenia"; })
    .then(data => {
      console.log(data);
      LOGIN_VALID(data); })
    .catch(error => console.log(error));
  });

//FORMULARZ TWORZENIA KONTA \/
  //ZMIANA KLASY (PODŚWIETLENIE INPUTA)
  function toggleValid(el, valid) {
    if (valid) {
      el.addClass("valid");
      el.removeClass("invalid"); }
    else {
      el.addClass("invalid");
      el.removeClass("valid"); }
  }

  //WALIDACJA LOGINU ORAZ HASŁA
  function LOGIN_PASS_VALID(element, error) {
    if (element.val().length < 5 || element.val().length > 18 || !/^[a-zA-Z0-9- ]*$/.test(element.val())) {
      errorMessage.text(error);
      toggleValid(element, false);
      return false; }
    else {
      errorMessage.text("");
      toggleValid(element, true);
      return true; }
  }

  //WALIDACJA ADRESU E-MAIL
  function EMAIL_VALID(element) {
    if (element.val().length < 6 || element.val().indexOf("@") === -1 || element.val().indexOf(".") === -1) {
      errorMessage.text("[!] Niepoprawny adres e-mail");
      toggleValid(element, false);
      return false; }
    else {
      errorMessage.text("");
      toggleValid(element, true);
      return true; }
  }

  //WALIDACJA Z BAZĄ \/
  function DATABASE_VALID(login, email) {
    isValid = false;

    fetch(url)
    .then(response => { return (response && response.ok) ? response.json() : "Błąd Połączenia"; })
    .then(data => {
      console.log(data);
      for (let i=0; i<data.length; i++) {
        if (data[i].email === email) {
          errorMessage.text("[!] Użytkownik o takim adresie e-mail już istnieje");
          toggleValid(inputEmail, false); }
        else if (data[i].login === login) {
          errorMessage.text("[!] Użytkownik o takim loginie już istnieje");
          toggleValid(inputLogin, false); }
        else if (i === data.length-1) {
          errorMessage.text("[!] Pomyślnie utworzono konto");
          toggleValid(inputLogin, true); toggleValid(inputEmail, true);
          createAccount({
            login: inputLogin.val(),
            password: inputPassword.val(),
            email: inputEmail.val()
          }); } } })
    .catch(error => console.log(error));
  }

  //TWORZENIE NOWEGO UŻYTKOWNIKA
  function createAccount(newUser) {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {"Content-Type" : "application/json"},
      dataType: "json"})
    .then(response => response.json())
    .then(data => {console.log(data); console.log("Added new user: ", newUser);})
    .catch(error => console.log(error));
  }

  //TWORZENIE NOWEGO KONTA
  buttonCreate.on("click", () => {
    if (LOGIN_PASS_VALID(inputLogin, "[!] Login musi zawierać od 5 do 18 znaków oraz tylko litery i cyfry.")) {
      console.log("...login validation correct");
      if (LOGIN_PASS_VALID(inputPassword, "[!] Hasło musi zawierać od 5 do 18 znaków oraz tylko litery i cyfry.")) {
        console.log("...password validation correct");
        if (EMAIL_VALID(inputEmail)) {
          console.log("...email validation correct");
          DATABASE_VALID(inputLogin.val(), inputEmail.val());
        }
      }
    }
  });

  //FUNKCJA USUWAJĄCA UŻYTKOWNIKA (PO id)
  function removeAccount(id) {
    fetch(url + id, {method: "DELETE"})
    .then(() => {console.log("deleted user: " + id);})
    .catch(error => console.log(error));
  }
});
