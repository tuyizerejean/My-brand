// let queryList = localStorage.getItem("queries");
// queryList = JSON.parse(queryList);
// queryList
const spin=document.querySelector(".lds-dual-ring")
const token=localStorage.getItem("accessToken")
async function queries(){
  spin.style.display="inline-block";
  console.log(token)
await fetch('https://my-brand-jean.herokuapp.com/api/v1/queries',
{
headers:{
  'Authorization': 'Bearer' + ' ' + token 
},
}
)
.then((res)=>res.json())
.then((data)=>{
  console.log(data)
  data.data.forEach(function(query)  {
  const blog = document.querySelector(".blogs");
  const articleCard = document.createElement("div");
  articleCard.setAttribute("class", "container grid");
  const blogCard = document.createElement("div");
  blogCard.setAttribute("class", "blog-card");
  blogCard.textContent = `Names: ${query.name}`;
  const link = document.createElement("a");
  link.setAttribute("class", "link");
  link.textContent = query.email;
  const info = document.createElement("div");
  info.setAttribute("class", "");
  const img = document.createElement("img");
  const date = document.createElement("i");
  date.textContent = moment(query.created_at);
  const h4 = document.createElement("h4");
  h4.textContent = `Subject: ${query.subject}`;
  const content = document.createElement("div");
  content.setAttribute("class", "some-content");
  const par = document.createElement("p");
  const readymore = document.createElement("p");
  readymore.textContent = query.location;
  par.textContent = query.message;
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
queries();

