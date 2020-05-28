'use strict';


async function showProducts(type = 0, search = "") {
    await hideOrder();
    await menuHover(type);
    let ids = ["-1"];
    if(type === -1) {
        for(const i in localStorage) {
            if (i.substring(0, 9) === "favourite" && localStorage.getItem(i) === "1") ids.push(i.substring(9));
        }
    } else ids = [];

    const products = await getProducts(type, search, ids.join(","));
    const container = document.getElementsByClassName("fruit-container")[0];
    container.innerHTML = "";
    for (const {product_id: id, name, description, price, discount, image_source} of products) {
        const img = await getImg(image_source);
        const card = await getCard(id, name, description, price, discount, img);
        container.append(card)
    }
}


async function getCard(id, name, description, price, discount, image) {
    //img of fruit
    const fruitImg = img();
    fruitImg.src = URL.createObjectURL(image);
    fruitImg.className = "fruit__img fruit__img_fixed";

    // name
    const fruitName = p();
    fruitName.append(name);
    fruitName.className = "fruit__name fruit__name_centered";
    //description
    const fruitDescription = p();
    fruitDescription.append(description);
    fruitDescription.className = "fruit__description fruit__description_centered";

    //price
    const fruitPriceNum = p();
    fruitPriceNum.append(`${price*(1-discount)} `);
    fruitPriceNum.className = "fruit__price-num fruit__price-num_centered";
    //count
    const fruitPriceText = p();
    fruitPriceText.append("грн/шт");
    fruitPriceText.className = "fruit__price-text fruit__price-text_centered";
    //fruit price block
    const fruitPrice = div();
    fruitPrice.append(fruitPriceNum);
    fruitPrice.append(fruitPriceText);
    fruitPrice.className = "fruit__price fruit__price_bottomed";

    //button text
    const fruitButtonScText = p();
    fruitButtonScText.append("В корзину");
    fruitButtonScText.className = "fruit__shopping-cart-text fruit__shopping-cart-text_centered";
    //button img
    const fruitButtonScImg = img();
    fruitButtonScImg.src = URL.createObjectURL(await getImg("assets/images/shopping-cart-white.svg"));
    //button shop-cart
    const fruitButtonSC = btn();
    fruitButtonSC.append(fruitButtonScText);
    fruitButtonSC.append(fruitButtonScImg);
    fruitButtonSC.onclick = saveOrder.bind({}, id);
    fruitButtonSC.className = "fruit__shopping-cart fruit__shopping-cart_size-max";

    //button fav img
    const fruitButtonFvImg = img();
    fruitButtonFvImg.src = URL.createObjectURL(
        localStorage.getItem(`favourite${id}`) === "0" || localStorage.getItem(`favourite${id}`) === null ?
        await getImg("assets/images/heart-white.svg") :
        await getImg("assets/images/heart-orange.svg"));
    //button fav
    const fruitButtonFV = btn();
    fruitButtonFV.append(fruitButtonFvImg);
    fruitButtonFV.onclick = favouriteHover.bind({}, id);
    fruitButtonFV.className = "fruit__favourite fruit_favourite_size-max";

    //card buttons
    const fruitButtons = div();
    fruitButtons.append(fruitButtonSC);
    fruitButtons.append(fruitButtonFV);
    fruitButtons.className = "fruit__buttons fruit__buttons_centered";

    //just to bottom
    const fruitPriceInfo = div();
    fruitPriceInfo.append(fruitPrice);
    fruitPriceInfo.append(fruitButtons);
    fruitPriceInfo.className = "fruit__price-info_bottomed";

    //fruit info block
    const fruitInfo = div();
    fruitInfo.append(fruitName);
    fruitInfo.append(fruitDescription);
    fruitInfo.append(fruitPriceInfo);

    fruitInfo.className = "fruit__info fruit__info_size-default";

    const fruit = div();
    fruit.append(fruitImg);
    fruit.append(fruitInfo);
    fruit.className = "fruit fruit_size-default";

    return fruit
}

async function favouriteHover(id, event) {
    const res = localStorage.getItem(`favourite${id}`) !== null ? localStorage.getItem(`favourite${id}`) : "0";
    if(res === "1") {
        localStorage.setItem(`favourite${id}`, "0");
        if (event.target.src !== undefined)
            event.target.src = URL.createObjectURL(await getImg("assets/images/heart-white.svg"));
        else
            event.target.firstChild.src = URL.createObjectURL(await getImg("assets/images/heart-white.svg"));
    } else {
        localStorage.setItem(`favourite${id}`, "1");
        if (event.target.src !== undefined)
            event.target.src = URL.createObjectURL(await getImg("assets/images/heart-orange.svg"));
        else
            event.target.firstChild.src = URL.createObjectURL(await getImg("assets/images/heart-orange.svg"));
    }
}


function saveOrder(id) {
    const cur = localStorage.getItem(`order${id}`) || 0;
    localStorage.setItem(`order${id}`, (parseInt(cur)+1).toString());
}


