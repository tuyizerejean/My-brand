// localStorage.setItem("queries", JSON.stringify([])); //initialising the local storage
function sendQeuries() {
  const queryForm = document.querySelector("#queryForm");
  queryForm.addEventListener("submit", function (event) {
    event.preventDefault();
    //getting the user location

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(console.log, console.log);
      const SuccessfullLookup = (position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=f771ed1eb4474843aa7ddf98d865dc08`
        )
          .then((response) => response.json())
          .then(console.log);
      };
      const location = navigator.geolocation.getCurrentPosition(
        SuccessfullLookup,
        console.log
      );
      console.log(location.result[0]);
    }

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

    const query = {
      id: uuidv4(),
      names,
      subject,
      email,
      details,
    };
    let queryList =
      JSON.parse(localStorage.getItem("queries")) === null
        ? []
        : JSON.parse(localStorage.getItem("queries"));
    queryList.push(query);
    localStorage.setItem("queries", JSON.stringify(queryList));
    window.alert("Successfully Added");
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
