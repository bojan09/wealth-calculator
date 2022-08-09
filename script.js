const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

// all the user data goes in the data variable
let data = [];

// Fetch random user and add money
const getRandomUser = async () => {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
};

// Initialize 3 users

getRandomUser();
getRandomUser();
getRandomUser();

// Double money on all users
const doubleMoney = () => {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDom();
};

// Sort users by richest
const sortByRichest = () => {
  data.sort((a, b) => b.money - a.money);

  updateDom();
};

// Filter only milionares
const showMilionares = () => {
  data = data.filter((user) => user.money > 100000);

  updateDom();
};

// Calculate entire Wealth of all Users
const calculateWealth = () => {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthElement = document.createElement("div");
  wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatNumberToMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthElement);
};

// Add new object to Data Array
const addData = (object) => {
  data.push(object);

  updateDom();
};

// Update DOM
const updateDom = (providedData = data) => {
  // Clear main div
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

  providedData.forEach((person) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> ${formatNumberToMoney(
      person.money
    )}`;

    main.appendChild(element);
  });
};

// Format numbers to money  https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
const formatNumberToMoney = (number) => {
  return "$ " + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

// Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMilionares);
calculateWealthBtn.addEventListener("click", calculateWealth);
