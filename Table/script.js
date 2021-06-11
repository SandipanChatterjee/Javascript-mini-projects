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
const fetchData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  users.push(...data);
  displayList(users);
};

fetchData();

/*
    const input = document.getElementById("myInput");
    const filteredUsers = [];
    input.addEventListener("keyup", function () {
        const str = this.value;
        for (let user of users) {
            if (user.name.includes(str)) {
                filteredUsers.push(user);
            }
        }
        displayList(filteredUsers);
    });
*/
