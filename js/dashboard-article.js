function renderArticle() {
  // let bloglist = localStorage.getItem("Blog");
  // bloglist = JSON.parse(bloglist);
  // bloglist.forEach((article) 
  fetch('https://my-brand-jean.herokuapp.com/api/v1/aritcles')
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
    link.setAttribute("href", `article.html#${article._id}`);
    const info = document.createElement("div");
    info.setAttribute("class", "Blog-info");
    const img = document.createElement("img");
    img.setAttribute("ALIGN", "left");
    img.setAttribute("src", article.image);
    const date = document.createElement("i");
    date.textContent = moment(article.created_at);
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
      event.preventDefault();
      const id = event.target.value;
     const token=localStorage.getItem("accessToken")
     console.log(token)
      if (
        window.confirm(`Are sure you want to delete article with id = ${id}`)
      ) {
        fetch(`https://my-brand-jean.herokuapp.com/api/v1/aritcles/${id}`
        ,{
          method:'DELETE',
          headers:{ 'Authorization': 'Bearer' + ' ' + token

          },
      }
        )
        .then((res)=>res.json())
        .then((data)=>{
          if(data){
            window.alert("The article is Deleted successfully");
            location.reload();
          }
          else{
            window.alert("Not deleted")
          }
        })
      } 
    });
    update.addEventListener("click", function (event) {
      event.preventDefault();
      const id = event.target.value;
      // console.log(id)
      location.assign(`create-article.html#${article._id}`);
    });
  });
})};
renderArticle();
