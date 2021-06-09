let str = "";
const listMeals = () => {
  const mealsList = document.querySelectorAll(".meal");
  for (let meal of mealsList) {
    meal.addEventListener("click", function () {
      const idMeal = this.getAttribute("idMeal");

      let mealData;
      fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + idMeal)
        .then((res) => res.json())
        .then((res) => {
          mealData = res.meals[0];
          console.log(mealData);
          const ingrediants = [];
          for (let i = 0; i < 20; i++) {
            if (mealData[`strIngredient${i}`]) {
              ingrediants.push(
                `${mealData[`strIngredient${i}`]} - ${
                  mealData[`strMeasure${i}`]
                }`
              );
            }
          }
          console.log("ingrediants#", ingrediants);
          const mealDesc = document.getElementById("meal-description");
          mealDesc.innerHTML = `
                    <h1>${mealData.strMeal}</h1>
                    <img src=${mealData.strMealThumb} alt=${mealData.strMeal}/>
                    <div class='single-meal-info'>
                        <p>${mealData.strArea}</p>
                        <p>${mealData.strCategory}</p>
                    </div>
                    <div class='main'>
                        <p>${mealData.strInstructions}</p>
                        <h2>Ingrediants</h2>
                        <ul>
                            ${ingrediants
                              .map((ingrediant) => `<li>${ingrediant}</li>`)
                              .join("")}
                        </ul>    
                    </div>
                `;
        });
    });
  }
};
const fetchMeals = async () => {
  document.getElementById("meal-description").innerHTML = "";
  let data = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + str
  );
  data = await data.json();
  const meals = data.meals;
  const mealListArr = meals.map((meal) => {
    return `
    <div class='meal' idMeal=${meal.idMeal}>
        <img src=${meal.strMealThumb} alt=${meal.strMeal} />
        <div class='meal-info'>
            <h3>${meal.strMeal}</h3>
        </div>
    </div>
  `;
  });
  document.getElementById("meals").innerHTML = mealListArr.join("");
  listMeals();
};

document.getElementById("search").addEventListener("change", function (e) {
  str = e.target.value;
});
document.getElementById("search-btn").addEventListener("click", function () {
  fetchMeals(str);
  //   str = "";
});
