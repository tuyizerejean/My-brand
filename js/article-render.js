const spin=document.querySelector(".lds-dual-ring");
async function blog(){
  spin.style.display="inline-block";
 await fetch('https://my-brand-jean.herokuapp.com/api/v1/aritcles')
  .then((res)=>res.json())
  .then((data)=>{
  data.data.forEach(function(article) {
    const blog = document.querySelector(".blogs");
    const articleCard = document.createElement("div");
    articleCard.setAttribute("class", "container grid");
    const blogCard = document.createElement("div");
    blogCard.setAttribute("class", "blog-card");
    const link = document.createElement("a");
    link.setAttribute("class", "link");
    link.setAttribute("href", `article.html#${article._id}`);
    const info = document.createElement("div");
    info.setAttribute("class", "Blog-info");
    const img = document.createElement("img");
    img.setAttribute("ALIGN", "left");
    img.setAttribute("src", article.image);
    const date = document.createElement("i");
    date.textContent = moment(article.created_ats);
    const h4 = document.createElement("h4");
    h4.textContent = article.title;
    const content = document.createElement("div");
    content.setAttribute("class", "some-content");
    const par = document.createElement("p");
    const readymore = document.createElement("button");
    readymore.textContent = "Read More";
    readymore.setAttribute("href", `article.html#${article._id}`);
    readymore.setAttribute("class", "read");
    par.textContent = article.content.slice(0, 500) + "......";
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
  });
  spin.style.display="none";
  // swal("Sent successfully", "Now your query is sent");
}
blog();
