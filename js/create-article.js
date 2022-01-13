let image = "";
document.querySelector("#myFileInput").addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    image = reader.result;
  });
  reader.readAsDataURL(this.files[0]);
});

localStorage.setItem("Blog", JSON.stringify([])); //initialising the local storage
function createArticle() {
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

    const createArticle = {
      title,
      image: image,
      article,
    };
    let bloglist = localStorage.getItem("Blog");
    bloglist = JSON.parse(bloglist);
    bloglist.push(createArticle);
    localStorage.setItem("Blog", JSON.stringify(bloglist));
    event.target.elements.title.value = "";
    event.target.elements.article.value = "";
  });
}
createArticle();
