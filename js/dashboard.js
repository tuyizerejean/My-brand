function logOut() {
  localStorage.removeItem("accessToken");
  location.assign("/pages/signin.html");
}
