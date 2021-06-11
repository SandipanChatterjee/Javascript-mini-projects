const users = [];
const myTable = document.getElementById("myTable");
const input = document.getElementById("myInput");

const displayList = (users) => {
  for (let user of users) {
    myTable.innerHTML += `
        <tr>
            <td>${user.name}</td>
            <td>${user.phone}</td>
        </tr>
      `;
  }
};
const searchHandler = () => {
  const tr = document.getElementsByTagName("tr");
  let searchVal = input.value.toUpperCase();
  for (let el of tr) {
    let td = el.getElementsByTagName("td")[0];
    let name = td.innerHTML;
    if (name.toUpperCase().includes(searchVal)) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  }
};

const sortAsc = () => {
  myTable.innerHTML = "";
  users.sort((a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();
    if (fa < fb) return -1;
    else if (fa > fb) return 1;
    return 0;
  });
  displayList(users);
};

const sortDesc = () => {
  myTable.innerHTML = "";
  users.sort((a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();
    if (fa < fb) return 1;
    else if (fa > fb) return -1;
    return 0;
  });
  displayList(users);
};
const fetchData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  users.push(...data);
  displayList(users);
};

fetchData();
