// function renderArticle() {
let bloglist =
  localStorage.getItem("Blog") === null
    ? []
    : JSON.parse(localStorage.getItem("Blog"));
bloglist.forEach((article) => {
  const blog = document.querySelector(".blogs");
  const articleCard = document.createElement("div");
  articleCard.setAttribute("class", "container grid");
  const blogCard = document.createElement("div");
  blogCard.setAttribute("class", "blog-card");
  const link = document.createElement("a");
  link.setAttribute("class", "link");
  link.setAttribute("href", `article.html#${article.id}`);
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
  const readymore = document.createElement("button");
  readymore.textContent = "Read More";
  readymore.setAttribute("href", `article.html#${article.id}`);
  readymore.setAttribute("class", "read");
  par.textContent = article.article.slice(0, 500) + "......";
  par.appendChild(readymore);
  info.appendChild(img);
  info.appendChild(date);
  info.appendChild(h4);
  link.appendChild(info);
  content.appendChild(par);
  blogCard.appendChild(link);
  blogCard.appendChild(content);
  articleCard.appendChild(blogCard);
  blog.appendChild(articleCard);
});

// }
// renderArticle();

// }
// renderArticle();
