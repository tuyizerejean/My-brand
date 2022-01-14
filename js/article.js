localStorage.setItem("Comments", JSON.stringify([])); //initialising the local storage
function sendComment() {
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
    // if (comment === "") {
    //   document.querySelector("#subjectError").style.display = "block";
    //   return;
    // } else {
    //   document.querySelector("#subjectError").style.display = "none";
    // }
    const commented = {
      addComment,
      comment,
    };
    let commentList = localStorage.getItem("Comments");
    commentList = JSON.parse(commentList);
    commentList.push(commented);
    localStorage.setItem("Comments", JSON.stringify(commentList));
    event.target.elements.addComment.value = "";
    event.target.elements.comment.value = "";
  });
}
sendComment();
