const state = {
  url: "https://jsonplaceholder.typicode.com/comments/",
  resultsOnEachPage: 10,
  startIndex: 1,
  endIndex: 10,
  dataMap: new Map(),
};

function display() {
  for (let i = state.startIndex; i <= state.endIndex; i++) {
    console.log(state.dataMap.get(i));
  }
}

function next() {
  state.startIndex = state.startIndex + state.resultsOnEachPage;
  state.endIndex = state.startIndex + state.resultsOnEachPage - 1;
  getData();
}

function previous() {
  state.startIndex = state.startIndex - state.resultsOnEachPage;
  state.endIndex = state.endIndex - state.resultsOnEachPage;

  if (state.startIndex < 1) {
    state.startIndex = 1;
    state.endIndex = state.resultsOnEachPage;
  } else {
    getData();
  }
}

async function getData() {
  for (let i = state.startIndex; i <= state.endIndex; i++) {
    if (!state.dataMap.has(i)) {
      await fetch(state.url + i)
        .then((response) => response.json())
        .then((json) => {
          state.dataMap.set(i, json);
        });
    }
  }

  display();
}

getData();

setTimeout(() => {
  next();

  setTimeout(previous, 2000);

  console.log(state.dataMap);
}, 2000);
