
function displayDishes() {
    const sortedDishes = dishes.sort((a, b) => a.name.localeCompare(b.name));

    let foodGrids = document.querySelectorAll(".food-grid");

    sortedDishes.forEach(dish => {
        let dishCard = document.createElement("div");
        dishCard.classList.add("food-item");
        dishCard.setAttribute("data-dish", dish.keyword);

        dishCard.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <p class="price">${dish.price}&#x20bd;</p>
            <p class="name">${dish.name}</p>
            <div class="info">
                <p class="weight">${dish.count}</p>
                <button class="add-button">Добавить</button>
            </div>
        `;

        if (dish.category === "soup") {
            foodGrids[0].append(dishCard);
        } else if (dish.category === "main_course") {
            foodGrids[1].append(dishCard);
        } else if (dish.category === "beverages") {
            foodGrids[2].append(dishCard);
        }
    });
    setupAddButtons();
    setupResetButton();
}

displayDishes();