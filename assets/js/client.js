const showClientInfo = () => document.getElementsByClassName("client")[0].style.display = "flex";
const confirmOrder = () => {
    const email = document.getElementsByClassName("client__input client__input_default")[0];
    const phone = document.getElementsByClassName("client__input client__input_default")[1];
    const destination = document.getElementsByClassName("client__input client__input_default")[2];

    const isEmail = checkEmail(email.value);
    const isPhone = checkPhone(phone.value);
    const isDestination = checkDestination(destination.value);


    if (!isEmail || !isPhone || !isDestination) {
        if (!isEmail) email.className = "client__input client__input_default client__input_error";
        else email.className = "client__input client__input_default";

        if (!isPhone) phone.className = "client__input client__input_default client__input_error";
        else phone.className = "client__input client__input_default";

        if (!isDestination) destination.className = "client__input client__input_default client__input_error";
        else destination.className = "client__input client__input_default";

    } else {
        const xhr = new XMLHttpRequest();

        const body = `email=${encodeURIComponent(email.value)}&phone=${encodeURIComponent(phone.value)}`;
        xhr.open("POST", 'assets/php/registration.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(body);
        xhr.onload = () => {
            const productCount = [];
            for(const i in localStorage) {
                if (i.substring(0, 5) === "order")
                    productCount.push([parseInt(i.substring(5)), parseInt(localStorage.getItem(i))])
            }
            const xhrOrder = new XMLHttpRequest();
            const bodyOrder =
                `id=${encodeURIComponent(JSON.parse(xhr.response).id)}
                 &delivery=${encodeURIComponent(destination.value)}
                 &count=${encodeURIComponent(JSON.stringify(productCount))}`;
            xhrOrder.open("POST", 'assets/php/new_order.php', true);
            xhrOrder.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhrOrder.send(bodyOrder)
        };



        document.getElementsByClassName("client client_size-max")[0].style.display = "none";
    }

};

const checkEmail = (email) => email.match(/^[A-Za-z].+@[a-z]+\.[a-z]+/);
const checkPhone = (phone) => phone.match(/^(0|\+380)\d{9}$/);
const checkDestination = (destination) => destination.length >= 4 && destination.length <= 80;
