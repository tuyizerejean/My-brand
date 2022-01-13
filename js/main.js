const bugger = document.querySelector(".bugger");
const navigation = document.querySelector(".navigation");
bugger.addEventListener("click", function () {
  console.log("clicked");
  navigation.classList.toggle("hide");
});
