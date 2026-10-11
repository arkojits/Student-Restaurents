const restaurants = [
  {
    _id: '1',
    name: 'Metropolia Myllypuro',
    city: 'Helsinki',
    company: 'Sodexo',
  },
  {
    _id: '2',
    name: 'Metropolia Myyrmäki',
    city: 'Vantaa',
    company: 'Sodexo',
  },
  {
    _id: '3',
    name: 'Metropolia Karamalmi',
    city: 'Espoo',
    company: 'Food & Co',
  },
  {
    _id: '4',
    name: 'Restaurant Luova',
    city: 'Helsinki',
    company: 'Food & Co',
  },
];

export async function getRestaurants() {
  return restaurants;
}