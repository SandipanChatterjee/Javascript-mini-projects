import { countries } from "./data.js";

function closeList() {
  const x = document.getElementsByClassName("autocomplete-list");
  for (let el of x) {
    el.parentNode.removeChild(el);
  }
}

const displayCountryList = (inp, countries) => {
  console.log(inp);
  const val = inp.value;

  closeList();
  const listDiv = document.createElement("div");
  listDiv.setAttribute("id", "input-auto-complete-list");
  listDiv.setAttribute("class", "autocomplete-list");
  inp.parentNode.append(listDiv);

  for (let el of countries) {
    if (el.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
      const countryDiv = document.createElement("div");
      countryDiv.innerHTML =
        "<strong>" + el.substr(0, val.length) + "</strong>";
      countryDiv.innerHTML += el.substr(val.length);
      countryDiv.innerHTML += `<input type='hidden' value=${el} /> `;
      listDiv.appendChild(countryDiv);

      countryDiv.addEventListener("click", function () {
        inp.value = this.getElementsByTagName("input")[0].value;
        closeList();
      });
    }
  }

  if (val == "") closeList();
};

const autoComplete = (inp, countries) => {
  if (!inp) return false;

  inp.addEventListener("input", function (e) {
    displayCountryList(inp, countries);
  });
};

autoComplete(document.getElementById("myInput"), countries);

let tags = [];
const createTags = (inp, countries) => {
  function createTagLabel(tagName) {
    const tag = document.createElement("div");
    tag.className = "tag";

    tag.innerHTML = `
      <span>${tagName}</span>
      <i class="fa fa-times" data-item=${tagName}></i>
    `;
    return tag;
  }

  function clearTags() {
    const tags = document.querySelectorAll(".tag");
    for (let el of tags) {
      el.parentNode.removeChild(el);
    }
  }

  function filterList(e) {
    document.getElementById("myInput").value = e.target.innerHTML;
    displayCountryList(document.getElementById("myInput"), countries);
  }

  function addTag() {
    clearTags();
    console.log(tags);
    tags.forEach((tag) => {
      const tagLabel = createTagLabel(tag);
      const tagContainer = document.querySelector(".tag-container");
      tagContainer.prepend(tagLabel);
      tagLabel.addEventListener("click", filterList);
    });
  }

  inp.addEventListener("keyup", function (e) {
    let val = this.value;
    if (e.keyCode == 13) {
      tags.push(val);
      inp.value = "";
      addTag();
    }
  });

  // delete/remove tags
  document.addEventListener("click", function (e) {
    if (e.target.tagName === "I") {
      const dataItem = e.target.getAttribute("data-item");
      tags = tags.filter((el) => el !== dataItem);
      addTag();
    }
  });
};

createTags(document.getElementById("search-input"), countries);
