// State
const state = {
  url: "https://jsonplaceholder.typicode.com/comments/",
  resultsOnEachPage: 10,
  startIndex: 1,
  endIndex: 10,
  dataMap: new Map(),
};

// variables
let nextBtn = document.getElementById("btn-next");
let prevBtn = document.getElementById("btn-prev");
let tbody = document.getElementById("tbody");
let loading = document.getElementById("loading");

// Event Listners
nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", previous);

// Functions

// Displays the data
function display() {
  tbody.innerHTML = "";
  for (let i = state.startIndex; i <= state.endIndex; i++) {
    if (state.dataMap.has(i)) {
      let data = state.dataMap.get(i);
      console.log(data);
      createRow(data.id, data.name, data.email, data.body);
    }
  }
}

// Moves to next Page
function next() {
  state.startIndex = state.startIndex + state.resultsOnEachPage;
  state.endIndex = state.startIndex + state.resultsOnEachPage - 1;

  // max data count is 500
  if (state.startIndex >= 499 || state.endIndex >= 499) {
    state.endIndex = 499;
    state.startIndex = 499 - state.resultsOnEachPage;
  }

  getData();
}

// Moves to previous Page
function previous() {
  state.startIndex = state.startIndex - state.resultsOnEachPage;
  state.endIndex = state.endIndex - state.resultsOnEachPage;

  // index cant go below 1
  if (state.startIndex < 1) {
    state.startIndex = 1;
    state.endIndex = state.resultsOnEachPage;
  } else {
    getData();
  }
}

// Gets the data from the source
async function getData() {
  for (let i = state.startIndex; i <= state.endIndex; i++) {
    if (!state.dataMap.has(i)) {
      loading.style.display = "inline";

      await fetch(state.url + i)
        .then((response) => response.json())
        .then((json) => {
          state.dataMap.set(i, json);
          loading.style.display = "none";
        });
    }
  }

  display();
}

// Creates a new row in the table
function createRow(id, name, email, body) {
  let tr = document.createElement("tr");
  let th = document.createElement("th");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");

  th.textContent = id;
  td1.textContent = name;
  td2.textContent = email;
  td3.textContent = body;

  tr.appendChild(th);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);

  let tbody = document.getElementById("tbody");
  tbody.appendChild(tr);
}

getData();
