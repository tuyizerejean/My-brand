function renderArticle() {
  // let bloglist = localStorage.getItem("Blog");
  // bloglist = JSON.parse(bloglist);
  // bloglist.forEach((article) 
  fetch('http://localhost:3000/api/v1/aritcles')
.then((res)=>res.json())
.then((data)=>{
data.data.forEach(function(article) {
    const blog = document.querySelector(".blogs");
    const articleCard = document.createElement("div");
    articleCard.setAttribute("class", "container grid");
    const blogCard = document.createElement("div");
    blogCard.setAttribute("class", "blog-card");
    const someContent = document.createElement("div");
    someContent.setAttribute("class", "btn");
    someContent.textContent = "Delete";
    const link = document.createElement("author");
    link.setAttribute("class", "link");
    link.setAttribute("href", ``);
    const info = document.createElement("div");
    info.setAttribute("class", "Blog-info");
    const img = document.createElement("img");
    img.setAttribute("ALIGN", "left");
    img.setAttribute("src", article.image);
    const date = document.createElement("i");
    date.textContent = moment(article.timestamp).fromNow();
    const h4 = document.createElement("h4");
    h4.textContent = article.title;
    const content = document.createElement("div");
    content.setAttribute("class", "some-content");
    const par = document.createElement("p");
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", " btn");
    deleteButton.setAttribute("value", article._id);
    deleteButton.setAttribute("id", "deleteButton");
    deleteButton.textContent = "Delete";
    const update = document.createElement("button");
    update.setAttribute("class", " btn");
    update.setAttribute("value", article._id);
    update.setAttribute("id", "update");
    update.textContent = "Update";
    par.textContent = article.content;
    info.appendChild(img);
    info.appendChild(date);
    info.appendChild(h4);
    link.appendChild(info);
    content.appendChild(par);
    blogCard.appendChild(link);
    blogCard.appendChild(content);
    par.appendChild(update);
    articleCard.appendChild(blogCard);
    blog.appendChild(articleCard);
    content.appendChild(update);
    content.appendChild(deleteButton);
    //deleting article
    deleteButton.addEventListener("click", function (event) {
      const id = event.target.value;
      const articles = JSON.parse(localStorage.getItem("Blog"));
      const filteredArticles = articles.filter((article) => {
        return article.id !== id;
      });
      if (
        window.confirm(`Are sure you want to delete article with id = ${id}`)
      ) {
        localStorage.setItem("Blog", JSON.stringify(filteredArticles));
        location.reload();
      } else {
        localStorage.setItem("Blog", JSON.stringify(articles));
        location.reload();
      }
    });
    //Updating the article
    update.addEventListener("click", function (event) {
      const id = event.target.value;
      // const articles = JSON.parse(localStorage.getItem("Blog"));
      // const ArticleFilter = articles.filter((article) => {
      //   return article.id == id;
      // });
      location.assign(`create-article.html#${article._id}`);
    });
  });
})};
renderArticle();
