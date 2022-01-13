function signInRequest() {
  const signInForm = document.querySelector("#signInForm");
  const changeEmail = document.querySelector("#changeEmail");
  //   console.log(changeEmail.innerHTML);
  //   changeEmail.innerHTML = "<h1>Admin Sign In</h1>";
  signInForm.addEventListener("submit", function (event) {
    event.preventDefault();
    //getting all input values
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log("email:", email, "\n Password:", password);
    const signIn = {
      email,
      password,
    };
  });
}
signInRequest();
