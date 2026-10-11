import {getRestaurants} from './api.js';

const restaurantList = document.querySelector('#restaurant-list');
const searchInput = document.querySelector('#search');
const cityFilter = document.querySelector('#city-filter');

let restaurants = [];

function createRestaurantCard(restaurant) {
  const card = document.createElement('article');

  const name = document.createElement('h3');
  name.textContent = restaurant.name;

  const city = document.createElement('p');
  city.textContent = `City: ${restaurant.city}`;

  const company = document.createElement('p');
  company.textContent = `Company: ${restaurant.company}`;

  card.append(name, city, company);

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

async function loadRestaurants() {
  try {
    restaurants = await getRestaurants();

    displayRestaurants(restaurants);
    createCityFilter();
  } catch (error) {
    console.error(error);
    restaurantList.innerHTML = '<p>Could not load restaurants.</p>';
  }
}

searchInput.addEventListener('input', filterRestaurants);
cityFilter.addEventListener('change', filterRestaurants);

loadRestaurants();