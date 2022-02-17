const id = location.hash.split("").slice(1, location.hash.length).join("");
fetch('https://my-brand-jean.herokuapp.com/api/v1/aritcles')
.then((res)=>res.json())
.then((data)=>{
  const selectData=data.data.filter((article) => {
   return article._id===id;
  });
  selectData.forEach((article) => {
  const blog = document.querySelector("#ViewArticle");
  const articleCard = document.createElement("div");
  articleCard.setAttribute("class", "article");
  const blogCard = document.createElement("div");
  blogCard.setAttribute("class", "container article-grid");
  const link = document.createElement("author");
  link.setAttribute("class", "link");
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
  const readymore = document.createElement("p");
  readymore.setAttribute("class", "read");
  par.textContent = article.content;
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
    document.querySelector("#addcommentError").style.display = "block";
    return;
  } else {
    document.querySelector("#addcommentError").style.display = "none";
  }
  if (comment === "") {
    document.querySelector("#commentError").style.display = "block";
    return;
  } else {
    document.querySelector("#commentError").style.display = "none";
  }
  // const commented = {
  //   commentId: uuidv4(),
  //   addComment,
  //   comment,
  //   timestamp: Date.now(),
  //   articleId: id,
  // };
  // let commentList =
  //   JSON.parse(localStorage.getItem("Comments")) === null
  //     ? []
  //     : JSON.parse(localStorage.getItem("Comments"));

  // commentList.push(commented);

  // localStorage.setItem("Comments", JSON.stringify(commentList));
  fetch(`https://my-brand-jean.herokuapp.com/api/v1/comments/${id}`
  ,{
    method:'POST',
    headers:{
      'Accept':'application/JSON,text/plain,*/*,',
      'Content-type':'application/json'
    },
    body:JSON.stringify({name:addComment,comment:comment})
   })
      .then((res)=>res.json())
  .then((data)=>{
    console.log(data)
    document.querySelector("#sentMessage").style.display = "block";
    event.target.elements.addComment.value = "";
    event.target.elements.comment.value = "";
    location.reload();
  })
  // window.alert("successfull Submitted");
});
// function renderArticle() {
// let commentList =
//   localStorage.getItem("Comments") === null
//     ? []
//     : JSON.parse(localStorage.getItem("Comments"));
console.log(id)
fetch(`https://my-brand-jean.herokuapp.com/api/v1/comments/${id}`)
.then((res)=>res.json())
.then((data)=>{
console.log(data)
// const dataRender = data.comments.filter((item) => {
//   return item.id === id;
// });
console.log(data.comments);
data.comments.forEach((commented) => {
  const commentCard = document.querySelector("#commentView");
  const commentHolder = document.createElement("div");
  commentHolder.setAttribute("class", "comment");
  const addCommentName = document.createElement("div");
  addCommentName.setAttribute("class", "some-content");
  addCommentName.textContent = commented.name;
  const commentField = document.createElement("p");
  commentField.textContent = commented.comment;
  const date = document.createElement("i");
  date.textContent = moment(commented.created_at);
  commentCard.appendChild(commentHolder);
  commentHolder.appendChild(addCommentName);
  commentHolder.appendChild(date);
  addCommentName.appendChild(commentField);
});
});
})

