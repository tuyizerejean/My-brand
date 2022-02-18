let islogin = localStorage.getItem("accessToken");
// islogin = JSON.parse(islogin);
if (islogin) {
  location.assign("/pages/dashboard.html");
}
