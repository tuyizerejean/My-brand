let image = "";
document.querySelector("#myFileInput").addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    image = reader.result;
  });
  reader.readAsDataURL(this.files[0]);
}); //initialising the local storage

function writeData(operation, id = null) {

  const createBlog = document.querySelector("#createBlog");
  createBlog.addEventListener("submit", function (event) {
    event.preventDefault();
    //getting all input values
    const title = event.target.elements.title.value;
    const article = event.target.elements.article.value;
    if (title === "") {
      document.querySelector("#titleError").style.display = "block";
      return;
    } else {
      document.querySelector("#titleError").style.display = "none";
    }
    if (article === "") {
      document.querySelector("#articleError").style.display = "block";
      return;
    } else {
      document.querySelector("#articleError").style.display = "none";
    }
    switch (operation) {
      case "create":
        const createArticle = {
          id: uuidv4(),
          title,
          image: image,
          article,
          timestamp: Date.now(),
        };
        let bloglist =
          JSON.parse(localStorage.getItem("Blog")) === null
            ? []
            : JSON.parse(localStorage.getItem("Blog"));

        bloglist.push(createArticle);
        localStorage.setItem("Blog", JSON.stringify(bloglist));
        window.alert("The article is Created successfully");
        event.target.elements.title.value = "";
        event.target.elements.article.value = "";
        break;
      case "update":
        const articleList = JSON.parse(localStorage.getItem("Blog"));
        articleList.forEach((article) => {
          if (article.id === id) {
            article.title = event.target.elements.title.value;
            article.article = event.target.elements.article.value;
          }
        });
        localStorage.setItem("Blog", JSON.stringify(articleList));
        window.alert("The article is updated successfully");
        location.assign(`/pages/article.html#${id}`);
        break;
      default:
        break;
    }
  });
}

const id = location.hash.split("").slice(1, location.hash.length).join("");
const formButton = document.querySelector(".multbutton");
if (id.length === 0) {
  formButton.innerHTML = "Create";
  writeData("create");
} else {
  const blog = JSON.parse(localStorage.getItem("Blog"));
  const articleTobeUpdated = blog.filter((article) => article.id === id);
  const title = document.querySelector("#title");
  title.setAttribute("value", articleTobeUpdated[0].title);
  const content = document.querySelector("#article");
  content.textContent = articleTobeUpdated[0].article;
  formButton.innerHTML = "Update";
  writeData("update", id);
}

