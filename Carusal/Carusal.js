let foods = [];
let slideIndex = 1;
const displayList = () => {
  const container = document.getElementById("container");
  let index = 1;
  for (let food of foods) {
    container.innerHTML += `
            <div class="mySlides fade">
                <div class='numbertext'>
                    ${index + "/" + foods.length}
                </div>
                <img src=${
                  food.strMealThumb
                } style="width: 100%; height: 300px; background-color: black" />
                <div class='text'>Caption Text</div>
            </div>
            <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>
        `;
    index += 1;
  }
  index = 1;
  // let dots = document.getElementById("dots");
  // for (let food of foods) {
  //   dots.innerHTML += `
  //       <span class='dot' onclick=${index}></span>
  //   `;
  //   index++;
  // }
  showSlides(slideIndex);
};

const plusSlides = (i) => {
  slideIndex += i;
  showSlides(slideIndex);
};

const showSlides = (n) => {
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");
  if (n < 1) {
    slideIndex = slides.length;
  }
  if (n > slides.length) {
    slideIndex = 1;
  }
  for (let slide of slides) {
    slide.style.display = "none";
  }
  console.log(slides[n], n);
  slides[slideIndex - 1].style.display = "block";
};

const fetchImages = async () => {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s"
  );
  const data = await res.json();
  foods = [...data.meals];
  displayList();
};

fetchImages();
