function setupResetButton() {
    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", function() {
        let orderItemsNot = document.querySelector(".order-items-not");
        let orderItems = document.querySelector(".order-items");
        let formButton = document.getElementById("form-button");
        orderItemsNot.style.display = "block";
        orderItems.style.display = "none";
        formButton.setAttribute("disabled", "disabled");
        document.querySelectorAll(".food-item").forEach(item => {
            item.classList.remove("selected");
        });
        orderItems.innerHTML = `
        <div class="order-item-soup">
            <p><b>Суп</b></p>
            <p>Блюдо не выбрано</p>
        </div>
        <div class="order-item-main-course">
            <p><b>Главное блюдо</b></p>
            <p>Блюдо не выбрано</p>
        </div>
        <div class="order-item-beverages">
            <p><b>Напиток</b></p>
            <p>Напиток не выбран</p>
        </div>
        <div class="order-item-coast">
            <p><b>Стоимость заказа</b></p>
            <p class="coast">0&#x20bd;</p>
        </div>
        `;
    });
}

function getDishesCategory(keyword) {
    for (const dish of dishes) {
        if (dish.keyword === keyword) {
            return dish.category;
        }
    }
    return undefined;
}

function getDishesPrice(keyword) {
    for (const dish of dishes) {
        if (dish.keyword === keyword) {
            return dish.price;
        }
    }
    return undefined;
}

function updateTotal() {
    let allItems = document.querySelectorAll(".food-item");
    let totalSum = 0;
    allItems.forEach(item => {
        if (item.classList.contains("selected")) {
            totalSum += getDishesPrice(item.getAttribute("data-dish"));
        }
    });
    console.log(totalSum);
    let orderCoast = document.querySelector(".order-item-coast");
    orderCoast.innerHTML = `
    <p><b>Стоимость заказа</b></p>
    <p class="coast">${totalSum}&#x20bd;</p>
    `;
}

function addToOrder(dish) {
    let orderItemsNot = document.querySelector(".order-items-not");
    let orderItems = document.querySelector(".order-items");
    let formButton = document.getElementById("form-button");
    orderItemsNot.style.display = "none";
    orderItems.style.display = "block";
    formButton.removeAttribute("disabled");

    if (dish.category === "soup") {
        let orderCategory = document.querySelector(".order-item-soup");
        orderCategory.innerHTML = `
        <p><b>Суп</b></p>
        <p>${dish.name} ${dish.price}₽</p>
        `;
        let inputForm = document.getElementById("input-soup");
        inputForm.value = dish.keyword;

    } else if (dish.category === "main_course") {
        let orderCategory = document.querySelector(".order-item-main-course");
        orderCategory.innerHTML = `
        <p><b>Главное блюдо</b></p>
        <p>${dish.name} ${dish.price}₽</p>
        `;
        let inputForm = document.getElementById("input-main-course");
        inputForm.value = dish.keyword;

    } else if (dish.category === "beverages") {
        let orderCategory = document.querySelector(".order-item-beverages");
        orderCategory.innerHTML = `
        <p><b>Напиток</b></p>
        <p>${dish.name} ${dish.price}₽</p>
        `;
        let inputForm = document.getElementById("input-beverage");
        inputForm.value = dish.keyword;
    }

    document.querySelectorAll(".food-item").forEach(item => {
        if (getDishesCategory(item
            .getAttribute("data-dish")) === dish.category) {
            item.classList.remove("selected");
        }
    });
    document.querySelector(`[data-dish="${dish.keyword}"]`)
        .classList.add("selected");

    updateTotal();
}

function setupAddButtons() {
    document.querySelectorAll(".add-button").forEach(button => {
        button.addEventListener("click", event => {
            const dishKeyword = event.target.closest(".food-item")
                .getAttribute("data-dish");
            const dish = dishes.find(d => d.keyword === dishKeyword);
            addToOrder(dish);
        });
    });
}
