function logOut() {
  localStorage.setItem("isLogin", JSON.stringify(false));
  location.assign("/pages/signin.html");
}
