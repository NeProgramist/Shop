'use strict';

const search = document.getElementsByClassName("header__search");

for (let i = 0; i < search.length-1; i++) search[i].addEventListener("keyup", (event) => {
    if (event.key === "Enter") showProducts(0, search[i].value)
});