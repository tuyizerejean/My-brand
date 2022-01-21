let islogin = localStorage.getItem("isLogin");
islogin = JSON.parse(islogin);
if (islogin === true) {
  location.assign("/pages/dashboard.html");
}
