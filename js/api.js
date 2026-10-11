const baseUrl =
  'https://media2.edu.metropolia.fi/restaurant/api/v1';

async function fetchJson(url, errorMessage) {
  const response = await fetch(url);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`${errorMessage}: ${response.status}`);
  }

  return response.json();
}

export async function getRestaurants() {
  const data = await fetchJson(
    `${baseUrl}/restaurants`,
    'Could not fetch restaurants'
  );

  return data || [];
}

export async function getDailyMenu(id) {
  const data = await fetchJson(
    `${baseUrl}/restaurants/daily/${id}/en`,
    'Could not fetch daily menu'
  );

  return data || {courses: []};
}

export async function getWeeklyMenu(id) {
  const data = await fetchJson(
    `${baseUrl}/restaurants/weekly/${id}/en`,
    'Could not fetch weekly menu'
  );

  return data;
}