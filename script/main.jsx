import "../style/main.scss";
const url = "http://localhost:3000/users/";

const buttonLogin = $("#buttonLogin");
const buttonCreate = $("#buttonCreate");
const inputLogin = $("#login");
const inputPassword = $("#password");
const inputEmail = $("#email");
const errorMessage = $("#errorMessage");

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
      // console.log(response);   //infoline
      for (let i=0; i<response.length;) {
        if ((response[i].login === inputLogin.val() || response[i].email === inputLogin.val()) && response[i].password === inputPassword.val()) {
          console.log("poprawny login oraz hasło.");  //infoline
          errorMessage.text("");
          //PRZEKIEROWANIE DO APLIKACJI
          break;
        }
        else {
          i++;
          if (i === response.length) {
            console.log("[!] Niepoprawny login lub hasło.");  //infoline
            errorMessage.text("[!] Niepoprawny login i/lub hasło.");
          }
        }
      }
    })
    .fail((error) => {
      console.log(error);
    });
  });

  //TWORZENIE NOWEGO KONTA
  buttonCreate.on("click", () => {
    console.log(inputPassword.val().length);
    if (inputLogin.val().length < 5)  //WALIDACJA LOGINU
      errorMessage.text("[!] Login musi zawierać przynajmniej 5 znaków.");
    else {
      if (inputPassword.val().length < 5)  //WALIDACJA HASŁA
        errorMessage.text("[!] Hasło musi zawierać przynajmniej 5 znaków.");
      else {
        if (!/^[a-zA-Z0-9- ]*$/.test(inputPassword.val()))  //DALSZA WALIDACJA HASŁA
          errorMessage.text("[!] Hasło może zawierać tylko litery i cyfry.");
        else {
          if (inputEmail.val().indexOf("@") === -1 || inputEmail.val().indexOf(".") === -1) //WALIDACJA E-MAIL
            errorMessage.text("[!] Niepoprawny email");
          else {  //POMYŚLNE ZAKOŃCZENIE WALIDACJI WSTĘPNEJ
            errorMessage.text("");
            $.ajax({
              url: url,
              method: "GET",
              dataType: "json"
            })
            .done((response) => {
              // console.log(response);   //infoline
              for (let i=0; i<response.length;) {
                if (response[i].login === inputLogin.val()) { //WALIDACJA NAZWY UŻYTKOWNIKA Z BAZĄ
                  errorMessage.text("[!] Użytkownik o takim loginie już istnieje.");
                  break;
                }
                else if (response[i].email === inputEmail.val()) {  //WALIDACJA E-MAIL Z BAZĄ
                  errorMessage.text("[!] Użytkownik o takim adresie e-mail już istnieje.");
                  break;
                }
                else {  //POMYŚLNE ZAKOŃCZENIE WALIDACJI
                  i++;
                  if (i === response.length) {
                    errorMessage.text("");
                    console.log("Pomyślnie utworzono konto");
                    createAccount({
                      login: inputLogin.val(),
                      password: inputPassword.val(),
                      email: inputEmail.val(),
                      id: inputLogin.val()
                    });
                    //PRZEKIEROWANIE NA STRONĘ APLIKACJI
                  }
                }
              }
            })
            .fail((error) => {
              console.log(error);
            });
          }
        }
      }
    }
  });

  function createAccount(newUser) {
    console.log(newUser);
    $.ajax({
      url: url,
      method: "POST",
      data: newUser
    })
    .done(response => {
      console.log(response);
    })
    .fail(error => {
      console.log(error);
    });
  }

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
