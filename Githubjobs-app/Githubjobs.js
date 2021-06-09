let description = document.getElementById("description");

let location_url = document.getElementById("location");

let jobsArr = [];

//pagination
let currentPage = 1;
let postPerPage = 10;
let currentPageEl = "";

const pageNumbers = [];

let baseUrl;
let container = document.getElementById("container");

const assignClickEvent = () => {
  const btns = document.querySelectorAll(".view-more");
  const jobs = document.querySelectorAll(".job-description");

  for (let btn of btns) {
    btn.addEventListener("click", function () {
      let id = this.id;
      for (let job of jobs) {
        if (job.getAttribute("data-description") == this.id) {
          if (this.nextElementSibling.style.display === "none") {
            this.nextElementSibling.style.display = "block";
            this.innerHTML = "View Less";
          } else {
            this.nextElementSibling.style.display = "none";
            this.innerHTML = "View More";
          }
        }
      }
    });
  }
};

const paginate = () => {
  let pageNumbersDOM = "";
  pageNumbers.length = 0;
  for (let i = 1; i <= Math.ceil(jobsArr.length / postPerPage); i++) {
    pageNumbers.push(i);
  }
  for (let pageNumber of pageNumbers) {
    pageNumbersDOM += `
          <li key=${pageNumber} className='page-item'>
            <a href='#' class='page-link' data-page-number=${pageNumber}>
              ${pageNumber}
            </a>
          </li>
    `;
  }
  let pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  pagination.innerHTML += `
  <nav>
    <ul className='pagination'>
      ${pageNumbersDOM}
    </ul>
  </nav>
  `;
  let pageLinks = document.querySelectorAll(".page-link");
  console.log("pageLinks", pageLinks);
  for (let pageLink of pageLinks) {
    if (
      (currentPageEl && currentPageEl.getAttribute("data-page-number")) ==
      pageLink.getAttribute("data-page-number")
    ) {
      console.log("pageLink##", pageLink.parentElement);
      pageLink.parentElement.className += " active";
    }

    pageLink.addEventListener("click", function () {
      console.log("this##", this);
      currentPageEl = this;
      currentPage = this.getAttribute("data-page-number");
      console.log("currentPage###", currentPage);
      fetchJobs();
    });
  }
};

const displayList = () => {
  container.innerHTML = "";
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentJobs = jobsArr.slice(indexOfFirstPost, indexOfLastPost);

  for (let jobs of currentJobs) {
    container.innerHTML += `
                <div class='job'>
                    <span><strong>${jobs.title}</strong>-${jobs.company}</span>
                    <span>${jobs.created_at}</span>
                    <p>
                        <span>${jobs.type}</span>
                        <span>${jobs.location}</span>
                    </p>
                    ${jobs.how_to_apply}
                    <link href=${jobs.company_url}>${jobs.company_url}</link>
                    <button id=${jobs.id} class='view-more'>View More</button>
                    <div class="job-description" data-description=${jobs.id} id=${jobs.id}>
                        ${jobs.description}
                    </div>
                </div>
            `;
  }

  assignClickEvent();
  paginate();
};

const fetchJobs = async () => {
  container.innerHTML = "<h1>loading...</h1>";
  baseUrl = `https://jobs.github.com/positions.json/?markdown=true&description=${description.value}&location=${location_url.value}`;
  const res = await fetch(baseUrl);
  jobsArr = await res.json();

  displayList();
};

const debounce = (fn) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log("call");
      fn(...args);
    }, 500);
  };
};

const betterFunc = debounce(fetchJobs);
description.addEventListener("keyup", function () {
  betterFunc();
});

location_url.addEventListener("keyup", function () {
  betterFunc();
});

fetchJobs();
