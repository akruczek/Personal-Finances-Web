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
  buttonLogin.on("click", () => {
    $.ajax({
      url: url,
      method: "GET",
      dataType: "json"
    })
    .done((response) => {
      console.log(response);   //infoline
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
    })
    .fail(error => { console.log(error); });
  });

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
    $.ajax({
      url: url,
      method: "GET",
      dataType: "json"
    })
    .done((response) => {
      for (let i = 0; i<response.length; i++) {
        // console.log(response[i].email);
        if (response[i].email === email) {
          errorMessage.text("[!] Użytkownik o takim adresie e-mail już istnieje");
          toggleValid(inputEmail, false); }
        else if (response[i].login === login) {
          errorMessage.text("[!] Użytkownik o takim loginie już istnieje");
          toggleValid(inputLogin, false); }
        else {
          if (i === response.length-1) {
            errorMessage.text("[!] Pomyślnie utworzono konto");
            toggleValid(inputLogin, true); toggleValid(inputEmail, true);
            createAccount({
              id: inputLogin.val() + inputPassword.val()[0] + inputEmail.val()[inputEmail.val().length-1],
              login: inputLogin.val(),
              password: inputPassword.val(),
              email: inputEmail.val()
            }); } }
      }
    })
    .fail(error => {console.log(error);});
  }

  //TWORZENIE NOWEGO UŻYTKOWNIKA
  function createAccount(newUser) {
    console.log(newUser);
    $.ajax({
      url: url,
      method: "POST",
      data: newUser
    })
    .done(response => {
      console.log("Added new user", newUser);
      console.log(response);
    })
    .fail(error => {
      console.log(error);
    });
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
    $.ajax({
      url: url + id,
      method: "DELETE"
    })
    .done((response) => {
      console.log("deleted user: " + id);
    })
    .fail((error) => {
      console.log(error);
    });
  }

});
