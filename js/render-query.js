let queryList = localStorage.getItem("queries");
queryList = JSON.parse(queryList);
queryList.forEach((query) => {
  const blog = document.querySelector(".blogs");
  const articleCard = document.createElement("div");
  articleCard.setAttribute("class", "container grid");
  const blogCard = document.createElement("div");
  blogCard.setAttribute("class", "blog-card");
  blogCard.textContent = query.names;
  const link = document.createElement("a");
  link.setAttribute("class", "link");
  link.textContent = query.email;
  const info = document.createElement("div");
  info.setAttribute("class", "");
  const img = document.createElement("img");
  const date = document.createElement("i");
  date.textContent = moment(query.timestamp).fromNow();
  const h4 = document.createElement("h4");
  h4.textContent = query.subject;
  const content = document.createElement("div");
  content.setAttribute("class", "some-content");
  const par = document.createElement("p");
  const readymore = document.createElement("p");
  par.textContent = query.details;
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
