import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://leads-tracker-app-a6d1f-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const btnEl = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

const referenceInDB = ref(database, "leads");

// Save whatever is typed in the input
btnEl.addEventListener("click", function () {
  if (inputEl.value.trim() === "") return;
  push(referenceInDB, inputEl.value);
  inputEl.value = "";
});

// Save the current tab's URL
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    push(referenceInDB, tabs[0].url);
  });
});

// Delete everything (double-click to avoid accidental wipes)
deleteBtn.addEventListener("dblclick", function () {
  remove(referenceInDB);
});

// Live-listen to the DB and re-render the list whenever it changes
onValue(referenceInDB, function (snapshot) {
  const data = snapshot.val();
  const leads = data ? Object.values(data) : [];
  render(leads);
});

onValue(referenceInDB, function(snapshot) {
  const snapshotDoesExist = snapshot.exists();
  if (snapshotDoesExist) {
    const snapshotValues = snapshot.val();
    const leads = Object.values(snapshotValues);
    render(leads);
  } else {
    render([]);
  }
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a target="_blank" href="${leads[i]}">${leads[i]}</a>
      </li>
    `;
  }
  ulEl.innerHTML = listItems;
}