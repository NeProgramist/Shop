'use strict';

const div = () => document.createElement("div");
const img = () => document.createElement("img");
const btn = () => document.createElement("button");
const p = () => document.createElement("p");
const input = () => document.createElement("input");

async function getImg(url) {
    return fetch(url).then(res => res.blob());
}

function hideOrder() {
    document.getElementsByClassName("order-container")[0].style.display = "none";
    document.getElementsByClassName("shopping-cart__text")[0].style.display = "none";
    document.getElementsByClassName("order__confirm-button")[0].style.display = "none";
    document.getElementsByClassName("client")[0].style.display = "none";
    document.getElementsByClassName("select select_max-width")[0].style = "";
    document.getElementsByClassName("fruit-container")[0].style.display = "grid";
}

function hideFruits() {
    document.getElementsByClassName("order-container")[0].style.display = "flex";
    document.getElementsByClassName("shopping-cart__text")[0].style.display = "flex";
    document.getElementsByClassName("order__confirm-button")[0].style.display = "flex";
    document.getElementsByClassName("fruit-container")[0].style.display = "none";
    document.getElementsByClassName("client")[0].style.display = "none";
    document.getElementsByClassName("select select_max-width")[0].style.display = "none";
}

async function menuHover(type) {
    const fav = document.getElementsByClassName("header__icon")[0].children[0];
    const cart = document.getElementsByClassName("header__icon")[1].children[0];
    fav.src = URL.createObjectURL(await getImg("assets/images/favourite-white.svg"));
    cart.src = URL.createObjectURL(await getImg("assets/images/shopping-cart.svg"));
    const menu = document.getElementsByClassName("select__item");
    for (let key = 0; key < 4; key++) menu[key].className = "select__item select__item_disabled";

    if (type === -1)
        fav.src = URL.createObjectURL(await getImg("assets/images/favourite-orange.svg"));
    else if (type === -2)
        cart.src = URL.createObjectURL(await getImg("assets/images/shopping-cart-orange.svg"));
    else
        menu[type].className = "select__item select__item_enabled";
}

async function getProducts(type = 0, search = "", ids = []) {
    return fetch(`./assets/php/products.php?type=${type}&search=${search}&ids=${ids}`)
        .then(value => value.json())
        .catch(console.log);
}
