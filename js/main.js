import {
  getRestaurants,
  getDailyMenu,
  getWeeklyMenu,
} from './api.js';

const restaurantList = document.querySelector('#restaurant-list');
const searchInput = document.querySelector('#search');
const cityFilter = document.querySelector('#city-filter');
const companyFilter = document.querySelector('#company-filter');

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
  city.textContent = `City: ${restaurant.city || 'Unknown'}`;

  const company = document.createElement('p');
  company.textContent = `Company: ${restaurant.company || 'Unknown'}`;

  const address = document.createElement('p');
  address.textContent = `Address: ${restaurant.address || 'Not available'}`;

  const button = document.createElement('button');
  button.textContent = 'View Menu';

  button.addEventListener('click', () => {
    selectedRestaurant = restaurant;
    restaurantName.textContent = restaurant.name;
    dialog.showModal();
    showDailyMenu();
  });

  card.append(name, city, company, address, button);

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
  const cities = [
    ...new Set(
      restaurants
        .map((restaurant) => restaurant.city)
        .filter(Boolean)
    ),
  ];

  cities.sort();

  cities.forEach((city) => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    cityFilter.appendChild(option);
  });
}

function createCompanyFilter() {
  const companies = [
    ...new Set(
      restaurants
        .map((restaurant) => restaurant.company)
        .filter(Boolean)
    ),
  ];

  companies.sort();

  companies.forEach((company) => {
    const option = document.createElement('option');
    option.value = company;
    option.textContent = company;
    companyFilter.appendChild(option);
  });
}

function filterRestaurants() {
  const searchValue = searchInput.value.toLowerCase().trim();
  const selectedCity = cityFilter.value;
  const selectedCompany = companyFilter.value;

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const name = restaurant.name?.toLowerCase() || '';

    const matchesSearch = name.includes(searchValue);

    const matchesCity =
      selectedCity === '' || restaurant.city === selectedCity;

    const matchesCompany =
      selectedCompany === '' ||
      restaurant.company === selectedCompany;

    return matchesSearch && matchesCity && matchesCompany;
  });

  displayRestaurants(filteredRestaurants);
}

async function showDailyMenu() {
  if (!selectedRestaurant) {
    return;
  }

  try {
    menuContent.innerHTML = '<p>Loading daily menu...</p>';

    const menu = await getDailyMenu(selectedRestaurant._id);

    menuContent.innerHTML = '<h3>Daily Menu</h3>';

    if (!menu.courses || menu.courses.length === 0) {
      menuContent.innerHTML += '<p>No daily menu available.</p>';
      return;
    }

    menu.courses.forEach((item) => {
      const div = document.createElement('div');
      div.classList.add('menu-item');

      const name = document.createElement('strong');
      name.textContent = item.name || 'Meal';

      const price = document.createElement('p');
      price.textContent = `Price: ${item.price || 'Not available'}`;

      const diets = document.createElement('p');
      diets.textContent = `Diets: ${item.diets || 'Not specified'}`;

      div.append(name, price, diets);
      menuContent.appendChild(div);
    });
  } catch (error) {
    console.error(error);
    menuContent.innerHTML = '<p>Could not load daily menu.</p>';
  }
}

async function showWeeklyMenu() {
  if (!selectedRestaurant) {
    return;
  }

  try {
    menuContent.innerHTML = '<p>Loading weekly menu...</p>';

    const menu = await getWeeklyMenu(selectedRestaurant._id);

    console.log('Weekly menu response:', menu);

    menuContent.innerHTML = '<h3>Weekly Menu</h3>';

    if (!menu) {
      menuContent.innerHTML += '<p>No weekly menu available.</p>';
      return;
    }

    if (Array.isArray(menu)) {
      if (menu.length === 0) {
        menuContent.innerHTML += '<p>No weekly menu available.</p>';
        return;
      }

      menu.forEach((item) => {
        const div = document.createElement('div');
        div.classList.add('menu-item');

        div.textContent = JSON.stringify(item);

        menuContent.appendChild(div);
      });

      return;
    }

    menuContent.innerHTML +=
      '<p>Weekly menu data received. Check Console for structure.</p>';
  } catch (error) {
    console.error(error);
    menuContent.innerHTML = '<p>Could not load weekly menu.</p>';
  }
}

async function loadRestaurants() {
  try {
    restaurantList.innerHTML = '<p>Loading restaurants...</p>';

    restaurants = await getRestaurants();

    displayRestaurants(restaurants);
    createCityFilter();
    createCompanyFilter();
  } catch (error) {
    console.error(error);
    restaurantList.innerHTML =
      '<p>Could not load restaurants.</p>';
  }
}

searchInput.addEventListener('input', filterRestaurants);
cityFilter.addEventListener('change', filterRestaurants);
companyFilter.addEventListener('change', filterRestaurants);

dailyButton.addEventListener('click', showDailyMenu);
weeklyButton.addEventListener('click', showWeeklyMenu);

closeDialog.addEventListener('click', () => {
  dialog.close();
});

loadRestaurants();