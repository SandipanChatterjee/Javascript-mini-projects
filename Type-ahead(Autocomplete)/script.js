const states = [];
let filteredStates = [];
const outputEl = () => {
  let result = filteredStates.map((state) => {
    return `<div className='states'>
        <p>${state.name} (${state.abbr})</p>
    </div> `;
  });
  return (document.getElementById("state-container").innerHTML =
    result.join(""));
};

const debounce = (fn) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, 500);
  };
};

const memoizedFunction = (fn) => {
  let cache = {};
  return (...args) => {
    if (cache[args]) {
      console.log("Fetching from cache");
      return cache[args];
    } else {
      console.log("executing and fetching results");
      cache[args] = fn(...args);
      return cache[args];
    }
  };
};

const memoizedResult = memoizedFunction(outputEl);

document.getElementById("input").addEventListener("keyup", function () {
  const val = this.value.toLowerCase();
  if (val.length == 0) filteredStates.length = 0;
  else {
    filteredStates = states.filter((el) => {
      let name = el.name.toLowerCase();
      return name.startsWith(val);
    });
  }
  debounce(outputEl)();
  memoizedResult();
});

const getState = async () => {
  const response = await fetch("../states.json");
  const data = await response.json();
  states.push(...data);
};

getState();
