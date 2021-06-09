const todoEl = document.querySelector(".master");

const taskList = [];
let str = "";
let count = 0; // id-purpose

// active-content
const activeContent = () => {
  const activeUl = document.getElementById("active").childNodes[1];
  console.log("activeUl##", activeUl);
  if (activeUl.hasChildNodes()) {
    let childNodes = activeUl.childNodes;
    for (let node of childNodes) {
      let checkBox = node.firstChild.firstChild;
      console.log("checkbox", checkBox);
      checkBox.addEventListener("change", () => {
        checkBox.checked = true;
        taskMove("", checkBox);
      });
      let delItemBtn = node.lastChild.lastChild.firstChild;
      console.log("delItemBtn###", delItemBtn);
      delTask(delItemBtn);
    }
  }
};

// complete-content
const completeContent = () => {
  const completeUl = document.getElementById("complete").childNodes[1];
  console.log("completeUl##", completeUl);
  if (completeUl.hasChildNodes()) {
    let childNodes = completeUl.childNodes;
    for (let node of childNodes) {
      let checkBox = node.firstChild.firstChild;
      checkBox.addEventListener("click", () => {
        taskMove("", checkBox);
      });

      let delItemBtn = node.lastChild.lastChild.firstChild;
      console.log("delItemBtn###", delItemBtn);
      delTask(delItemBtn);
    }
  }
};

//add/remove task from ont tab to another
const taskMove = (flag, checkBox) => {
  console.log("completeTaskList()");
  const lists = document.querySelectorAll(".list-task");
  for (let list of lists) {
    console.log(list);
    if (list.id === checkBox.id) {
      console.log(checkBox.checked);
      if (checkBox.checked) {
        //add to complete tab
        list.firstChild.firstChild.checked = true;
        list.style.textDecoration = "line-through";
        let listTask = document.querySelectorAll(".list-task"); // all task
        const ulComplete = document.querySelector(".ul-complete");
        for (let task of listTask) {
          if (!ulComplete.children.namedItem(task.id)) {
            if (task.id == list.id) {
              let clonedListEl = task.cloneNode(true); //node-clone
              console.log("clonedListEl##", clonedListEl);
              clonedListEl.className = "list-task-complete";
              clonedListEl.id = task.id;
              document.querySelector(".ul-complete").append(clonedListEl);
            }
          }
        }

        //remove from active tab
        const ulActiveTab = document.querySelector(".ul-active");
        if (ulActiveTab.hasChildNodes()) {
          let childNodes = ulActiveTab.childNodes;
          for (let node of childNodes) {
            if (node.id === checkBox.id) {
              ulActiveTab.removeChild(node);
            }
          }
        }
      } else {
        list.firstChild.firstChild.checked = false;
        list.style.textDecoration = "none";

        //remove from complete tab
        const ulCompTab = document.querySelector(".ul-complete");
        if (ulCompTab.hasChildNodes()) {
          let childNodes = ulCompTab.childNodes;
          for (let node of childNodes) {
            if (node.id === checkBox.id) {
              ulCompTab.removeChild(node);
            }
          }
        }

        //add to active tab
        let listTask = document.querySelectorAll(".list-task"); // all task
        for (let task of listTask) {
          const ulActive = document.querySelector(".ul-active");
          if (!ulActive.children.namedItem(task.id)) {
            if (task.id == list.id) {
              let clonedListEl = task.cloneNode(true); //node-clone
              console.log("clonedListEl##", clonedListEl);
              clonedListEl.className = "list-task-active";
              clonedListEl.id = task.id;
              ulActive.append(clonedListEl);
            }
          }
        }
      }
    }
  }
  completeContent();
  activeContent();
};

const delTask = (delBtn) => {
  console.log(delBtn, delBtn.parentElement.id);
  delBtn.addEventListener("click", () => {
    const lists = document.querySelectorAll(
      ".list-task, .list-task-active, .list-task-complete"
    );
    console.log("lsists########", lists);
    for (list of lists) {
      console.log("list", list, list.id);
      if (list.id.toString() == delBtn.parentElement.id) {
        list.remove();
        // break;
      }
    }
  });
};

//check -func
const check = (checkBox) => {
  // console.log("checkFunc##");
  checkBox.addEventListener("change", (e) => taskMove("", checkBox));
};

//create li,checkbox,strContainer
const create = () => {
  let li = document.createElement("li");
  li.className = "list-task";
  li.id = count;

  let checkBox = document.createElement("input");
  checkBox.className = "check-box";
  checkBox.type = "checkbox";
  checkBox.id = count;

  const strContainer = document.createElement("span");
  strContainer.innerText = str;
  strContainer.className = "text";
  strContainer.id = count;

  const listDiv = document.createElement("div");
  listDiv.append(checkBox, strContainer);

  const delDiv = document.createElement("div");
  const delSpan = document.createElement("span");
  delSpan.className = "del-container";
  delSpan.id = count;
  const i = document.createElement("i");
  i.className = "fa fa-trash";

  delSpan.append(i);
  delDiv.append(delSpan);

  return {
    li,
    listDiv,
    checkBox,
    delDiv,
  };
};

//addtask func - add task list in all tab
const addTask = () => {
  let obj = create();

  const { li, listDiv, checkBox, delDiv } = obj;

  li.append(listDiv, delDiv);
  taskList.push(li);

  let clonedNode = li.cloneNode(true);
  clonedNode.className = "list-task-active";

  document.querySelector(".ul-all").append(li);
  document.querySelector(".ul-active").append(clonedNode);

  check(checkBox);

  //del
  delTask(delDiv.firstChild.firstChild);
  // for active tab
  activeContent();
};

// openTodoList func.
const openList = (evt, tabName) => {
  //   console.log(evt, tabName);
  let i, tabContent, tabLink;
  tabContent = document.getElementsByClassName("tabcontent");
  // console.log("tabContent", tabContent);
  for (let el of tabContent) {
    el.style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  if (evt) {
    console.log(evt);
    evt.currentTarget.className += " active";
  }
};

//tabs link

document
  .getElementById("all-btn")
  .addEventListener("click", (evt) => openList(evt, "all"));

document
  .getElementById("active-btn")
  .addEventListener("click", (evt) => openList(evt, "active"));

document
  .getElementById("complete-btn")
  .addEventListener("click", (evt) => openList(evt, "complete"));

openList("", "active");

//input-box and search button

document.querySelector(".input-box").addEventListener("keyup", (e) => {
  str = e.target.value;
  if (str !== "") {
    if (e.keyCode == 13) {
      e.preventDefault();
      addBtnEl.click();
      str = "";
    }
  } else {
    alert("please enter text");
  }
});

const addBtnEl = document.querySelector(".add-btn");
addBtnEl.addEventListener("click", () => {
  if (str == "") {
    alert("please enter text");
    console.log("PRINT");
  } else {
    console.log("PRINT");
    addTask(str, ++count);
    document.querySelector(".input-box").value = "";
  }
});
