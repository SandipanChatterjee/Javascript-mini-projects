let messages = [];
let messageBody = {};
const favourites = [];
const getData = async (id) => {
  let url;
  if (id && id.length > 0) {
    url = `https://api.maildrop.cc/v2/mailbox/test/${id}`;
  } else {
    url = `https://api.maildrop.cc/v2/mailbox/test/`;
  }
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": "QM8VTHrLR2JloKTJMZ3N6Qa93FVsx8LapKCzEjui",
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

const displayMessageBody = async (id) => {
  document.getElementById("message-body").innerHTML = "loading..";
  const data = await getData(id);
  messageBody = { ...data };
  console.log(messageBody);
  document.getElementById("message-body").innerHTML = `
    <h3>
        <span>${messageBody.from}</span>
        <span>${messageBody.date}</span>
    </h3>
    <span>
        <span>${messageBody.subject}</span>
        <a href="#" class='delete-elements'>Delete</a>
    </span>
    <iframe id="inlineFrameExample"
        display="block"
        width="100%"
        height="800"
    >
    </iframe>
  `;
  var ifrm = document.getElementById("inlineFrameExample");
  var doc =
    ifrm.contentWindow || ifrm.contentDocument.document || ifrm.contentDocument;
  doc.document.open();
  doc.document.write(messageBody.html);
  doc.document.close();

  //Delete Mail
  let delEls = document.querySelectorAll(".delete-elements");
  let url = `https://api.maildrop.cc/v2/mailbox/test/${id}`;
  for (let delEl of delEls) {
    delEl.addEventListener("click", async function () {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "X-API-KEY": "QM8VTHrLR2JloKTJMZ3N6Qa93FVsx8LapKCzEjui",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      document.getElementById("inbox").innerHTML = "";
      messages = messages.filter((el) => el.id !== id);
      displayEl();
    });
  }
};

function sortAsc() {
  document.getElementById("asc").style.display = "none";
  document.getElementById("dsc").style.display = "inline-block";
  messages.sort((a, b) => {
    const nameA = a.from.toUpperCase();
    const nameB = b.from.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  document.getElementById("inbox").innerHTML = "";
  displayEl();
}

function sortDsc() {
  document.getElementById("dsc").style.display = "none";
  document.getElementById("asc").style.display = "inline-block";
  messages.sort((a, b) => {
    const nameA = a.from.toUpperCase();
    const nameB = b.from.toUpperCase();
    if (nameA > nameB) return -1;
    if (nameA < nameB) return 1;
    return 0;
  });
  document.getElementById("inbox").innerHTML = "";
  displayEl();
}

const assignClickEvent = (e) => {
  const inboxELs = document.querySelectorAll(".inbox-elements");
  for (let inboxEl of inboxELs) {
    inboxEl.addEventListener("click", function () {
      inboxELs.forEach((el) => {
        el.classList.remove("active");
      });
      inboxEl.classList.add("active");
      displayMessageBody(this.id);
    });
  }

  const favs = document.querySelectorAll(".favourites");
  for (let fav of favs) {
    fav.addEventListener("click", function () {
      // console.log(this.id, this.parentElement.id);
      if (!fav.classList.contains("activeFavourites")) {
        fav.classList.add("activeFavourites");
        if (this.id === this.parentElement.id) {
          favourites.push(this.parentElement);
        }
      } else {
        fav.classList.remove("activeFavourites");
        favourites.splice(favourites.indexOf(this.parentElement), 1);
      }
    });
  }
};

const displayFavourites = () => {
  document.getElementById("inbox").innerHTML = "";
  for (let fav of favourites) {
    console.log(fav.length);
    document.getElementById("favouritesDisplay").append(fav);
  }
};

const displayEl = () => {
  document.getElementById("favouritesDisplay").innerHTML = "";
  favourites.length = 0;
  document.getElementById("totalElements").innerHTML = messages.length;
  for (let message of messages) {
    document.getElementById("inbox").innerHTML += `
            <div id=${message.id} class='inbox-elements'>
                <button class='favourites' id=${message.id}></button>
                <span>
                    <h3>${message.from}</h3>                   
                    <p>${message.date}</p>  
                </span>          
                <span>${message.subject}</span>              
            </div>
        `;
  }
  assignClickEvent();
};

document.getElementById("input").addEventListener("keyup", function () {
  const inboxELs = document.querySelectorAll(".inbox-elements");
  const val = this.value.toLowerCase();
  for (let inboxEl of inboxELs) {
    const elVal = inboxEl.children[1].firstElementChild.innerHTML.toLowerCase();
    if (elVal.includes(val)) {
      inboxEl.style.display = "block";
    } else {
      inboxEl.style.display = "none";
    }
  }
});

const initMessage = async () => {
  document.getElementById("inbox").innerHTML = "loading..";
  const data = await getData();
  document.getElementById("inbox").innerHTML = "";
  console.log(data);
  messages.push(...data.messages);
  console.log("messages", messages);
  displayEl();
};

initMessage();
