const buttons = document.getElementsByClassName("btn");
for (let button of buttons) {
  button.addEventListener("click", function () {
    console.log(this.classList);
    this.classList.toggle("active");
    const div = this.nextElementSibling;
    console.log("div.style.maxHeight#", div.style.maxHeight);
    if (div.style.maxHeight) {
      div.style.maxHeight = null;
    } else {
      console.log("div.scrollHeight#", div.scrollHeight);
      div.style.maxHeight = div.scrollHeight + "px";
    }
  });
}
