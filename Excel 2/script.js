const sheet = document.getElementById("sheet");
const addRowBtn = document.querySelector(".add-row-btn");
const removeRowBtn = document.querySelector(".remove-row-btn");
const addColBtn = document.querySelector(".add-col-btn");
const sheetArr = [];
let rowCount = 0,
  colCount = 0;

function addRow(param) {
  colCount = 0;

  const div = document.createElement("div");
  div.setAttribute("data-row", rowCount);
  div.innerHTML = `
        <input type="text" data-col='col-${rowCount}-${colCount}'/>
    `;

  sheet.appendChild(div);
  rowCount++;
}
addRowBtn.addEventListener("click", addRow);

function addCol() {
  colCount++;
  const input = document.createElement("input");
  input.type = "text";
  input.setAttribute("data-col", "col-" + rowCount + "-" + colCount);
  console.log(sheet.lastElementChild);
  if (colCount < 6) {
    sheet.lastElementChild.appendChild(input);
  } else {
    addRow("col");
  }
}
addColBtn.addEventListener("click", addCol);

function removeRow() {
  sheet.lastElementChild.remove();
}

removeRowBtn.addEventListener("click", removeRow);
