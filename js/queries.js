// localStorage.setItem("queries", JSON.stringify([])); //initialising the local storage
let exaclyLocation;
if (navigator.geolocation) {
    const SuccessfullLookup = (position) => {
      const { latitude, longitude } = position.coords;
      console.log(latitude);
      console.log(longitude);
      let apiLocation = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=f771ed1eb4474843aa7ddf98d865dc08`;
      console.log(apiLocation);
      fetch(apiLocation)
        .then((response) => response.json())
        .then((data) => {
          let resultsList = data.results;
          // console.log("Exactly location is:", resultsList[0].formatted);
          exaclyLocation = resultsList[0].formatted;
           console.log(exaclyLocation);
        });
    };
    navigator.geolocation.getCurrentPosition(SuccessfullLookup);
  }

function sendQeuries() {
  const queryForm = document.querySelector("#queryForm");
  queryForm.addEventListener("submit", function (event) {
    event.preventDefault();
    //getting the user location

    //getting all input values
    const names = event.target.elements.names.value;
    const subject = event.target.elements.subject.value;
    const email = event.target.elements.email.value;
    const details = event.target.elements.details.value;
    if (names === "") {
      document.querySelector("#nameError").style.display = "block";
      return;
    } else {
      document.querySelector("#nameError").style.display = "none";
    }
    if (subject === "") {
      document.querySelector("#subjectError").style.display = "block";
      return;
    } else {
      document.querySelector("#subjectError").style.display = "none";
    }
    if (!validateEmail(email) || email === "") {
      document.querySelector("#emailError").style.display = "block";
      return;
    } else {
      document.querySelector("#emailError").style.display = "none";
    }
    if (details === "") {
      document.querySelector("#detailError").style.display = "block";
      return;
    } else {
      document.querySelector("#detailError").style.display = "none";
    }
    // const query = {
    //   id: uuidv4(),
    //   names,
    //   subject,
    //   email,
    //   details,
    //   exaclyLocation,
    // };
    // let queryList =
    //   JSON.parse(localStorage.getItem("queries")) === null
    //     ? []
    //     : JSON.parse(localStorage.getItem("queries"));
    // queryList.push(query);
    // localStorage.setItem("queries", JSON.stringify(queryList));
  //   const formData = new FormData();
  //   formData.append('name',names );
  //   formData.append("email",email);
  //   formData.append("subject",subject);
  //  formData.append("details",message);
  //   formData.append("exaclyLocation",location);
  // console.log(exaclyLocation)
    fetch('https://my-brand-jean.herokuapp.com/api/v1/queries'
    ,{
      method:'POST',
      headers:{
        'Accept':'application/JSON,text/plain,*/*,',
        'Content-type':'application/json'
      },
      body:JSON.stringify({name:names,email:email,subject:subject,message:details,location:exaclyLocation})
     })
        .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
      document.querySelector("#successSend").style.display = "block";
    })
    event.target.elements.names.value = "";
    event.target.elements.subject.value = "";
    event.target.elements.email.value = "";
    event.target.elements.details.value = "";
  });
}
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
sendQeuries();
