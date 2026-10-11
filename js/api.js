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

const dailyMenus = {
  1: [
    {name: 'Chicken pasta', price: '2.95 €', diets: 'L'},
    {name: 'Vegetable soup', price: '2.95 €', diets: 'V, G'},
  ],
  2: [
    {name: 'Salmon with potatoes', price: '2.95 €', diets: 'G'},
    {name: 'Vegan curry', price: '2.95 €', diets: 'V'},
  ],
  3: [
    {name: 'Beef stew', price: '2.95 €', diets: 'L'},
    {name: 'Vegetable pasta', price: '2.95 €', diets: 'V'},
  ],
  4: [
    {name: 'Chicken rice bowl', price: '2.95 €', diets: 'G'},
    {name: 'Lentil soup', price: '2.95 €', diets: 'V, G'},
  ],
};

const weeklyMenus = {
  1: [
    {day: 'Monday', meal: 'Chicken pasta'},
    {day: 'Tuesday', meal: 'Fish and potatoes'},
    {day: 'Wednesday', meal: 'Vegetable curry'},
    {day: 'Thursday', meal: 'Beef stew'},
    {day: 'Friday', meal: 'Pasta bolognese'},
  ],
  2: [
    {day: 'Monday', meal: 'Salmon soup'},
    {day: 'Tuesday', meal: 'Chicken curry'},
    {day: 'Wednesday', meal: 'Vegetable pasta'},
    {day: 'Thursday', meal: 'Meatballs'},
    {day: 'Friday', meal: 'Fish fillet'},
  ],
  3: [
    {day: 'Monday', meal: 'Beef stew'},
    {day: 'Tuesday', meal: 'Chicken soup'},
    {day: 'Wednesday', meal: 'Vegan curry'},
    {day: 'Thursday', meal: 'Salmon pasta'},
    {day: 'Friday', meal: 'Vegetable soup'},
  ],
  4: [
    {day: 'Monday', meal: 'Chicken rice'},
    {day: 'Tuesday', meal: 'Lentil soup'},
    {day: 'Wednesday', meal: 'Fish pasta'},
    {day: 'Thursday', meal: 'Vegetable curry'},
    {day: 'Friday', meal: 'Chicken soup'},
  ],
};

export async function getRestaurants() {
  return restaurants;
}

export async function getDailyMenu(id) {
  return dailyMenus[id] || [];
}

export async function getWeeklyMenu(id) {
  return weeklyMenus[id] || [];
}