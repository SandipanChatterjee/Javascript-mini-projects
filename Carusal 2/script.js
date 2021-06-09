let images = [];
let imgIndex = 1;
const displayImages = () => {
  const container = document.getElementById("container");
  for (let image of images) {
    container.innerHTML += `
            <div class='image'>
                <span>
                    <img src=${image.strMealThumb} style="height:200px;width:100%"/>
                </span>
                <button onclick='changeImage(-1)'><strong><</strong></button>
                <button onclick='changeImage(1)'><strong>></strong></button>
            </div>
        `;
  }
  carouselHandler(imgIndex);
};

const changeImage = (i) => {
  imgIndex += i;
  carouselHandler(imgIndex);
};

const carouselHandler = (n) => {
  const images = document.querySelectorAll(".image");
  if (n < 1) {
    imgIndex = images.length;
  }
  if (n > images.length) {
    imgIndex = 1;
  }

  for (let image of images) {
    image.style.display = "none";
  }
  images[imgIndex - 1].style.display = "block";
};

const getImages = async () => {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s"
  );
  const data = await res.json();
  images = [...data.meals];
  displayImages();
};
getImages();
