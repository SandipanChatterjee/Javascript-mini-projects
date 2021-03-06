let foodArr = [];

const container = document.getElementById("container");
const input = document.getElementById("input");

let favFoodArr = [];

const assignClickEvent = () => {
  const btns = document.querySelectorAll(".food-btns");
  for (let btn of btns) {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-favoutire");
      btn.className += " active";
      for (let food of foodArr) {
        if (id == food.id) {
          favFoodArr.push(food);
        }
      }
    });
  }
};

const showFavList = () => {
  container.innerHTML = "";
  displayList(favFoodArr);
};

const displayList = (fdArr) => {
  console.log(fdArr);
  for (let food of fdArr) {
    container.innerHTML += `
              <div class='food'>
                  <div class='food-img'>
                      <img src=${
                        "https://iswiggy.herokuapp.com/" + food.img
                      } width=100% height=200px alt=${food.img} />
                      <button class='food-btns' data-favoutire=${
                        food.id
                      }></button>
                  </div>
                  <p class='food-name'><strong>${food.name}</strong></p>
                  <div class='food-tags'>
                    ${food.tags
                      .map((tag, ind) =>
                        ind == food.tags.length - 1
                          ? `<span class='tag'>${tag}</span>`
                          : `<span class='tag'>${tag},</span>`
                      )
                      .join("")}                    
                  </div>
                  <div class='food-description'>                  
                    <span class='food-rating'>${food.rating}</span>
                    <span class='food-eta'>${
                      food.eta
                    }mins</span>                  
                  </div>

              </div>
          `;
  }
  assignClickEvent();
};

const inputHandler = () => {
  const inputVal = input.value.toUpperCase();
  const foods = document.getElementsByTagName("strong");
  for (let food of foods) {
    if (food.innerHTML.toUpperCase().includes(inputVal)) {
      food.parentElement.parentElement.style.display = "block";
    } else {
      food.parentElement.parentElement.style.display = "none";
    }
  }
};

const tags = document.getElementById("tag");
const sortFn = () => {
  tags.addEventListener("change", function () {
    container.innerHTML = "";
    console.log("foodArr", foodArr);
    foodArr = foodArr.sort((a, b) => {
      if (this.value === "eta") {
        console.log("PRINT");
        return parseFloat(a.eta) - parseFloat(b.eta);
      } else if (this.value === "rating") {
        return parseFloat(b.rating) - parseFloat(a.rating);
      } else {
      }
    });
    console.log("foodArr", foodArr);
    displayList(foodArr);
  });
};

const fetchFood = async () => {
  const res = await fetch("https://iswiggy.herokuapp.com/data/api.json");
  const data = await res.json();
  foodArr = [...data];
  displayList(foodArr);
};

fetchFood();
sortFn();
