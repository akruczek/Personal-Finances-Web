import "../style/main.scss";
const url = "http://localhost:3000/users";

const buttonLogin = $("#buttonLogin");
const inputLogin = $("#login");
const inputPassword = $("#password");
const errorMessage = $("#errorMessage");

$(() => {
  console.log("test");

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
});
