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
    // const title = event.target.elements.title.value;
    // const content = event.target.elements.content.value;
    var image = document.getElementById("myFileInput").files[0];
    var title = document.getElementById("title").value;
    var content = document.getElementById("article").value;
    if (title === "") {
      document.querySelector("#titleError").style.display = "block";
      return;
    } else {
      document.querySelector("#titleError").style.display = "none";
    }
    if (content === "") {
      document.querySelector("#articleError").style.display = "block";
      return;
    } else {
      document.querySelector("#articleError").style.display = "none";
    }
    switch (operation) {
      case "create":
        // const createArticle = {
        //   id: uuidv4(),
        //   title,
        //   image: image,
        //   article,
        //   timestamp: Date.now(),
        // };
        // let bloglist =
        //   JSON.parse(localStorage.getItem("Blog")) === null
        //     ? []
        //     : JSON.parse(localStorage.getItem("Blog"));
        // bloglist.push(createArticle);
        // localStorage.setItem("Blog", JSON.stringify(bloglist));
        const formData = new FormData();
        formData.append('image',image);
        formData.append("title",title);
        formData.append("content",content);
       const token= localStorage.getItem("accessToken")
        fetch('https://my-brand-jean.herokuapp.com/api/v1/aritcles/'
        ,{
          method:'POST',
          headers:{
            'Authorization': 'Bearer' + ' ' + token
          },
          body:formData
      }
        )
        .then((res)=>res.json())
        .then((data)=>{
          // console.log("image is",image, title,content)
          console.log(data)
          window.alert("The article is Created successfully");
          location.assign(`/pages/Admin_viewArticle.html`);
        })
        event.target.elements.title.value = "";
        event.target.elements.content.value = "";
        break;
      case "update":
        fetch(`https://my-brand-jean.herokuapp.com/api/v1/aritcles/${id}`
        ,{
          method:'PUT',
          headers:{
            'Authorization': 'Bearer' + ' ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGI3OTZkN2NjMjhlNDE4OTZmNzdiZSIsImlhdCI6MTY0NDkxOTE2NSwiZXhwIjoxNjQ1NTIzOTY1fQ.RXv_CGDofhWyydZCRYSImmHgFSaD0hJ-MBWxeBrCpuk'
          },
          body:formData
      }
        )
        .then((res)=>res.json())
        .then((data)=>{
          console.log(data)
        data.data.forEach((article) => {
          if (article._id === id) {
            article.title = event.target.elements.title.value;
            article.content = event.target.elements.article.value;
            article.image = image;
          }
        });
      });
        
      // localStorage.setItem("Blog", JSON.stringify(articleList));
        // window.alert("The article is updated successfully");
        // location.assign(`/pages/article.html#${id}`);
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
//   const formData = new FormData();
//   formData.append('image',image);
//   formData.append("title",title);
//   formData.append("content",content);
//   fetch(`https://my-brand-jean.herokuapp.com/api/v1/aritcles/${id}`
//   ,{
//     method:'PUT',
//     headers:{
//       'Authorization': 'Bearer' + ' ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGI3OTZkN2NjMjhlNDE4OTZmNzdiZSIsImlhdCI6MTY0NDkxOTE2NSwiZXhwIjoxNjQ1NTIzOTY1fQ.RXv_CGDofhWyydZCRYSImmHgFSaD0hJ-MBWxeBrCpuk'
//     },
//     body:formData
// })
// .then((res)=>res.json())
//         .then((data)=>{console.log(data)});
          // console.log(data)
  // const blog = JSON.parse(localStorage.getItem("Blog"));
  // const articleTobeUpdated = data.filter((article) => article.id === id);
  // const title = document.querySelector("#title");
  // title.setAttribute("value", articleTobeUpdated[0].title);
  // const content = document.querySelector("#article");
  // content.textContent = articleTobeUpdated[0].article;
  // formButton.innerHTML = "Update";
  // image = articleTobeUpdated[0].image;
  writeData("update", id);
}

