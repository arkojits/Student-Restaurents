const baseUrl =
  'https://media2.edu.metropolia.fi/restaurant/api/v1';

export async function getRestaurants() {
  const response = await fetch(`${baseUrl}/restaurants`);

  if (!response.ok) {
    throw new Error('Could not fetch restaurants');
  }

  return response.json();
}

export async function getDailyMenu(id) {
  const response = await fetch(
    `${baseUrl}/restaurants/daily/${id}/en`
  );

  if (!response.ok) {
    throw new Error('Could not fetch daily menu');
  }

  return response.json();
}

export async function getWeeklyMenu(id) {
  const response = await fetch(
    `${baseUrl}/restaurants/weekly/${id}/en`
  );

  if (!response.ok) {
    throw new Error('Could not fetch weekly menu');
  }

  return response.json();
}