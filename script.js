const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const mealList = document.getElementById('meal-list');

searchForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const searchTerm = searchBox.value.trim();
    let url;
    if (!searchTerm) {
        url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    } else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    displayMeals(data.meals);
});

function displayMeals(meals) {
    mealList.innerHTML = '';

    if (!meals) {
        mealList.innerHTML = '<p>No meals found. Please try another search term.</p>';
        return;
    }

    meals.forEach(meal => {
        const mealBox = document.createElement('div');
        mealBox.classList.add('meal-box');
        mealBox.innerHTML = `
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        `;
        mealList.appendChild(mealBox);
    });
}
