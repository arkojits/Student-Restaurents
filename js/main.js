import {getRestaurants} from './api.js';

const restaurantList = document.querySelector('#restaurant-list');

async function loadRestaurants() {
  try {
    restaurantList.innerHTML = '<p>Loading restaurants...</p>';

    const restaurants = await getRestaurants();

    console.log(restaurants);

    restaurantList.innerHTML = '';

    restaurants.forEach((restaurant) => {
      const card = document.createElement('article');

      const name = document.createElement('h3');
      name.textContent = restaurant.name;

      const city = document.createElement('p');
      city.textContent = restaurant.city || 'City not available';

      card.append(name, city);
      restaurantList.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    restaurantList.innerHTML = '<p>Could not load restaurants.</p>';
  }
}

loadRestaurants();