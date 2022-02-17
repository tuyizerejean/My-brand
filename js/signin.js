function signInRequest() {
  const signInForm = document.querySelector("#signInForm");
  signInForm.addEventListener("submit", function (event) {
    // localStorage.setItem("isLogin", JSON.stringify(false));
    // const signIn = {
    //   email: "tuyibobu@gmail.com",
    //   password: "jean",
    // };
    // localStorage.setItem("signIn", JSON.stringify(signIn));
     event.preventDefault();
    //getting all input values
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    if (!validateEmail(email) || email === "") {
      document.querySelector("#emailError").style.display = "block";
      return;
    } else {
      document.querySelector("#emailError").style.display = "none";
    }
    if (password === "") {
      document.querySelector("#passwordError").style.display = "block";
      return;
    } else {
      document.querySelector("#passwordError").style.display = "none";
    }
    // let user = localStorage.getItem("signIn");
    // user = JSON.parse(user);
    fetch('https://my-brand-jean.herokuapp.com/api/v1/users/login'
    ,{
      method:'POST',
      headers:{
        'Accept':'application/JSON,text/plain,*/*,',
        'Content-type':'application/json'
      },
      body:JSON.stringify({email:email,password:password},)
  }
    )
    .then((res)=>res.json())
    .then((data)=>{
      if(data.accessToken)
      {
        console.log(data.accessToken)
        localStorage.setItem("accessToken",data.accessToken)
      // window.alert("successfull login in")
      location.assign("/pages/dashboard.html");
      }
      else{
        document.querySelector("#apiError").style.display = "block";
      }
    
      // location.assign("/pages/dashboard.html");
    }
    )
    
    // if ((user.email === email) & (user.password === password)) {
    //   localStorage.setItem("isLogin", JSON.stringify(true));
    //   location.assign("/pages/dashboard.html");
    // } else {
    //   localStorage.setItem("isLogin", JSON.stringify(false));
    //   document.querySelector("#loginError").style.display = "block";
    // }
  });
}
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
signInRequest();
