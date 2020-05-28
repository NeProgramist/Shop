'use strict';

async function showCart() {
    hideFruits();
    await menuHover(-2);
    const ids = ["-1"];
    const cancelImg = await getImg("assets/images/delete-button.svg");
    const container = document.getElementsByClassName("order-container")[0];
    container.innerHTML = "";
    container.append(orderHeader());
    for(const i in localStorage) {
        if (i.substring(0, 5) === "order") ids.push(i.substring(5))
    }
    const products = await getProducts(0, "", ids.join(','));
    let resPrice = 0;
    for (const {product_id: id, name, price, discount, country, image_source} of products) {
        const img = await getImg(image_source);
        const amount = localStorage.getItem(`order${id}`);
        const card = await getOrder(id, name, price, discount, country, amount, img, cancelImg);
        resPrice += price*(1-discount)*amount;
        container.append(card)
    }
    document
        .getElementsByClassName("order__confirm-button order__confirm-button_size-max")[0]
        .textContent = `ВСЕГО: ${resPrice} грн`
}

async function getOrder(id, name, price, discount, country, amount, image, cancelImg) {

    //delete button
    const deleteImg = img();
    deleteImg.src = URL.createObjectURL(cancelImg);

    const deleteBtn = btn();
    deleteBtn.append(deleteImg);
    deleteBtn.onclick = deleteFruit.bind({}, id, price*(1-discount)*amount);
    deleteBtn.className = "order__delete order__delete_size-max";

    //fruit img
    const fruitImg = img();
    fruitImg.src = URL.createObjectURL(image);
    fruitImg.className = "order__fruit-img_size-max";

    const orderFruitText = p();
    orderFruitText.append(name);
    orderFruitText.className = "order__fruit-text";

    const orderFruitTextCountry = p();
    orderFruitTextCountry.append(country);
    orderFruitTextCountry.className = "order__fruit-text_country";

    const orderInfoDiv = div();
    orderInfoDiv.append(orderFruitText);
    orderInfoDiv.append(orderFruitTextCountry);
    orderInfoDiv.className = "order_info";

    const fruitDiv = div();
    fruitDiv.append(deleteBtn);
    fruitDiv.append(fruitImg);
    fruitDiv.append(orderInfoDiv);
    fruitDiv.className = "order__fruit";

    const fruitPriceNum = p();
    fruitPriceNum.append(`${price*(1-discount)} `);
    fruitPriceNum.className = "fruit__price-num fruit__price-num_centered";
    const fruitPriceText = p();
    fruitPriceText.append("грн/шт");
    fruitPriceText.className = "fruit__price-text fruit__price-text_bottomed";

    const fruitPrice = div();
    fruitPrice.append(fruitPriceNum);
    fruitPrice.append(fruitPriceText);
    fruitPrice.className = "fruit__price";

    const count = input();
    count.value = amount;
    count.defaultValue = amount;
    count.type = "text";
    count.onchange = changeCount.bind({}, id, price*(1-discount));
    count.className = "order__count order__count_size-max";

    const orderColumn = div();
    orderColumn.append(count);
    orderColumn.append(fruitPrice);
    orderColumn.className = "order__column";

    const order = div();
    order.append(fruitDiv);
    order.append(orderColumn);
    order.className = "order order_centered";

    return order

}

function orderHeader() {
    const orderName = p();
    orderName.append("ТОВАР");
    orderName.className = "order__description-text";

    const orderColumnCount = p();
    orderColumnCount.append("КОЛИЧЕСТВО");
    orderColumnCount.className = "order__description-text";
    const orderColumnPrice = p();
    orderColumnPrice.append("ЦЕНА");
    orderColumnPrice.className = "order__description-text";

    const orderColumn = div();
    orderColumn.append(orderColumnCount);
    orderColumn.append(orderColumnPrice);
    orderColumn.className = "order__column";

    const order = div();
    order.append(orderName);
    order.append(orderColumn);
    order.className = "order order_hidden order_centered";

    return order;
}


function deleteFruit(id, price, event) {
    console.log(event.target.parentNode);
    event.target.parentNode.parentNode.parentNode.style.display = "none";
    localStorage.removeItem(`order${id}`);
    const prev = document
        .getElementsByClassName("order__confirm-button order__confirm-button_size-max")[0]
        .textContent;

    document
        .getElementsByClassName("order__confirm-button order__confirm-button_size-max")[0]
        .textContent = `ВСЕГО: ${prev.split(" ")[1] - price} грн`
}

function changeCount(id, price, event) {
    const newValue = event.target.value;
    const prev = document
        .getElementsByClassName("order__confirm-button order__confirm-button_size-max")[0]
        .textContent;

    document
        .getElementsByClassName("order__confirm-button order__confirm-button_size-max")[0]
        .textContent = `ВСЕГО: ${prev.split(" ")[1] - price*(event.target.defaultValue - newValue)} грн`;

    localStorage.setItem(`order${id}`, newValue);
    event.target.defaultValue = newValue;
}
