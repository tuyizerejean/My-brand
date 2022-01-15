removeItem = () => {
  if (window.confirm(`Are sure you want to delete all articles`)) {
    localStorage.removeItem("Blog");
    location.reload();
  }
};
