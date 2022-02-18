let image = "";
document.querySelector("#myFileInput").addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    image = reader.result;
  });
  reader.readAsDataURL(this.files[0]);
}); //initialising the local storage
const spin=document.querySelector(".lds-dual-ring")
const token= localStorage.getItem("accessToken")
async function writeData(operation, id = null) {
  const createBlog = document.querySelector("#createBlog");
  createBlog.addEventListener("submit", function (event) {
    event.preventDefault();
    spin.style.display="inline-block";
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
        /* ----local storage concepts
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
        */
        const formData = new FormData();
        formData.append('image',image);
        formData.append("title",title);
        formData.append("content",content);
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
          console.log(data)
          spin.style.display="none";
          // swal(" message Sent successfully", "Now it is sent click ok to continue!!");
          window.alert("Successfully posted")
                 location.assign(`/pages/Admin_viewArticle.html`);
              })
        event.target.elements.title.value = "";
        event.target.elements.content.value = "";
        break;
      case "update":
        article.title = event.target.elements.title.value;
        article.content = event.target.elements.content.value;
        article.image = image;
        console.log(image)
        if(!image){
          const dataForm = new FormData();
          // dataForm.append('image',image);
          dataForm.append("title",title);
          dataForm.append("content",content);
          fetch(`https://my-brand-jean.herokuapp.com/api/v1/aritcles/${id}`
          ,{
            method:'PUT',
            headers:{
              'Authorization': 'Bearer' + ' ' + token         
             },
            body:dataForm
        }
          )
          .then((res)=>res.json())
          .then((data)=>{
            console.log(data.data)
        // localStorage.setItem("Blog", JSON.stringify(articleList));
        spin.style.display="none";
          window.alert("The article is updated successfully");
          location.assign(`/pages/article.html#${id}`);
          })
        }
        else{
          const dataForm = new FormData();
          dataForm.append('image',image);
          dataForm.append("title",title);
          dataForm.append("content",content);
          fetch(`https://my-brand-jean.herokuapp.com/api/v1/aritcles/${id}`
          ,{
            method:'PUT',
            headers:{
              'Authorization': 'Bearer' + ' ' + token         
             },
            body:dataForm
        }
          )
          .then((res)=>res.json())
          .then((data)=>{
            console.log(data.data)
        // localStorage.setItem("Blog", JSON.stringify(articleList));
        spin.style.display="none";
          window.alert("The article is updated successfully");
          location.assign(`/pages/article.html#${id}`);
          })
        }
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
  // First get the article by ID
  // second render the data to form
  // call update
  // const blog = JSON.parse(localStorage.getItem("Blog"));
  fetch(`https://my-brand-jean.herokuapp.com/api/v1/aritcles/${id}`)
.then((res)=>res.json())
.then((data)=>{
  const articleTobeUpdated = data.data
  const title = document.querySelector("#title");
  title.setAttribute("value", articleTobeUpdated.title);
  const content = document.querySelector("#article");
  content.textContent = articleTobeUpdated.content;
  formButton.innerHTML = "Update";
  image = articleTobeUpdated.image;
  writeData("update", id);
})
}


