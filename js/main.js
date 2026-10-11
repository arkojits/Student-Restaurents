import {
  getRestaurants,
  getDailyMenu,
  getWeeklyMenu,
} from './api.js';

const restaurantList = document.querySelector('#restaurant-list');
const searchInput = document.querySelector('#search');
const cityFilter = document.querySelector('#city-filter');

const dialog = document.querySelector('#menu-dialog');
const closeDialog = document.querySelector('#close-dialog');
const restaurantName = document.querySelector('#restaurant-name');
const menuContent = document.querySelector('#menu-content');

const dailyButton = document.querySelector('#daily-button');
const weeklyButton = document.querySelector('#weekly-button');

let restaurants = [];
let selectedRestaurant = null;

function createRestaurantCard(restaurant) {
  const card = document.createElement('article');

  const name = document.createElement('h3');
  name.textContent = restaurant.name;

  const city = document.createElement('p');
  city.textContent = `City: ${restaurant.city}`;

  const company = document.createElement('p');
  company.textContent = `Company: ${restaurant.company}`;

  const button = document.createElement('button');
  button.textContent = 'View Menu';

  button.addEventListener('click', () => {
    selectedRestaurant = restaurant;
    restaurantName.textContent = restaurant.name;
    dialog.showModal();
    showDailyMenu();
  });

  card.append(name, city, company, button);

  return card;
}

function displayRestaurants(list) {
  restaurantList.innerHTML = '';

  if (list.length === 0) {
    restaurantList.innerHTML = '<p>No restaurants found.</p>';
    return;
  }

  list.forEach((restaurant) => {
    const card = createRestaurantCard(restaurant);
    restaurantList.appendChild(card);
  });
}

function createCityFilter() {
  const cities = [...new Set(restaurants.map((restaurant) => restaurant.city))];

  cities.sort();

  cities.forEach((city) => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    cityFilter.appendChild(option);
  });
}

function filterRestaurants() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedCity = cityFilter.value;

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name
      .toLowerCase()
      .includes(searchValue);

    const matchesCity =
      selectedCity === '' || restaurant.city === selectedCity;

    return matchesSearch && matchesCity;
  });

  displayRestaurants(filteredRestaurants);
}

async function showDailyMenu() {
  const menu = await getDailyMenu(selectedRestaurant._id);

  menuContent.innerHTML = '<h3>Daily Menu</h3>';

  menu.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('menu-item');

    div.innerHTML = `
      <strong>${item.name}</strong>
      <p>${item.price}</p>
      <p>${item.diets}</p>
    `;

    menuContent.appendChild(div);
  });
}

async function showWeeklyMenu() {
  const menu = await getWeeklyMenu(selectedRestaurant._id);

  menuContent.innerHTML = '<h3>Weekly Menu</h3>';

  menu.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('menu-item');

    div.innerHTML = `
      <strong>${item.day}</strong>
      <p>${item.meal}</p>
    `;

    menuContent.appendChild(div);
  });
}

async function loadRestaurants() {
  restaurants = await getRestaurants();

  displayRestaurants(restaurants);
  createCityFilter();
}

searchInput.addEventListener('input', filterRestaurants);
cityFilter.addEventListener('change', filterRestaurants);

dailyButton.addEventListener('click', showDailyMenu);
weeklyButton.addEventListener('click', showWeeklyMenu);

closeDialog.addEventListener('click', () => {
  dialog.close();
});

loadRestaurants();