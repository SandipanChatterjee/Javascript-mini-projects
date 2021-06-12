const bbchars = [];
let tmp = [];
let ids = [];
const innerContainer = document.getElementById("inner-container");
const input = document.getElementById("input");
const displayList = (classNameProperty = "") => {
  innerContainer.innerHTML = "";
  for (let bbchar of bbchars) {
    innerContainer.innerHTML += `
            <div class='character'>
                <img src=${bbchar.img} height='100%' width='100%'/>
                <div class='text-container'>
                    <p class='name'>${bbchar.name}</p>
                    <p>${bbchar.nickname}</p>                   
                </div>
                <button id=${bbchar.char_id} class='btns ${classNameProperty}'></button>
            </div>
        `;
  }

  paginate();
  const btns = document.querySelectorAll(".btns");
  for (let btn of btns) {
    btn.addEventListener("click", function () {
      this.className += " active";
      selectFav(this.id);
    });
  }
  tmp = [...bbchars];
  bbchars.length = 0;
};

const selectFav = (id) => {
  const characterEls = document.querySelectorAll(".character");
  for (let character of characterEls) {
    console.log(character.lastElementChild.id, id);
    if (character.lastElementChild.id == id) {
      ids.push(id);
    }
  }
};

function displayFav() {
  console.log("ids#", ids);
  let set = new Set();
  for (let bbchar of tmp) {
    for (let id of ids) {
      if (bbchar.char_id == id) {
        set.add(bbchar);
      }
    }
  }
  bbchars.push(...set);
  displayList("active");
  ids.length = 0;
}

const paginate = () => {
  input.value = "";
  const div = document.getElementById("paginate");
  div.firstElementChild.innerHTML = "";
  for (let i = 1; i <= 51; i++) {
    div.firstElementChild.innerHTML += `
            <li id=${i > 1 ? i + 10 : i} class='list'>${i}</li>
        `;
  }
  const lists = document.querySelectorAll(".list");
  for (let list of lists) {
    list.addEventListener("click", function () {
      list.className += " active";
      fetchChar(this.id);
    });
  }
};

const search = () => {
  const characterEls = document.querySelectorAll(".character");
  for (let characterEl of characterEls) {
    const names = characterEl.getElementsByClassName("name");
    for (let name of names) {
      console.log("input##", input, "name##", name.innerHTML);
      let inputVal = input.value.toLowerCase();
      let nameVal = name.innerHTML.toLowerCase();
      if (nameVal.includes(inputVal)) {
        // console.log("called");
        characterEl.style.display = "block";
      } else {
        characterEl.style.display = "none";
      }
    }
  }
};

const fetchChar = async (offset = 1) => {
  const res = await fetch(
    `https://www.breakingbadapi.com/api/characters?limit=10&offset=${offset}`
  );
  const data = await res.json();
  //   console.log(data);
  bbchars.push(...data);
  //   console.log(bbchars);
  displayList();
};

fetchChar();
