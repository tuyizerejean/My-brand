const id = location.hash.split("").slice(1, location.hash.length).join("");
let bloglist = localStorage.getItem("Blog");
bloglist = JSON.parse(bloglist);
const data = bloglist.filter((element) => {
  return element.id === id;
});
data.forEach((article) => {
  const blog = document.querySelector("#ViewArticle");
  const articleCard = document.createElement("div");
  articleCard.setAttribute("class", "article");
  const blogCard = document.createElement("div");
  blogCard.setAttribute("class", "container article-grid");
  const link = document.createElement("author");
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
  const readymore = document.createElement("p");
  readymore.setAttribute("href", `article.html#${article.id}`);
  readymore.setAttribute("class", "read");
  par.textContent = article.article;
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

const commentForm = document.querySelector("#commentForm");
commentForm.addEventListener("submit", function (event) {
  event.preventDefault();
  //getting all input values
  const addComment = event.target.elements.addComment.value;
  const comment = event.target.elements.comment.value;
  if (addComment === "") {
    document.querySelector("#commentError").style.display = "block";
    return;
  } else {
    document.querySelector("#commentError").style.display = "none";
  }
  const commented = {
    addComment,
    comment,
  };
  let commentList =
    localStorage.getItem("Comments") === null
      ? []
      : localStorage.getItem("Comments");
  commentList = JSON.parse(commentList);
  commentList.push(commented);
  localStorage.setItem("Comments", JSON.stringify(commentList));
  event.target.elements.addComment.value = "";
  event.target.elements.comment.value = "";
  console.log(commentList);
});
