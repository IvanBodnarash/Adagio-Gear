"use strict"

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};

if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow');
    if (menuArrows.length > 0) {
        for (let i = 0; i < menuArrows.length; i++) {
            const menuArrow = menuArrows[i];
            menuArrow.addEventListener('click', function (e) {
                menuArrow.parentElement.classList.toggle('_active');
            })
        }
    }

} else {
    document.body.classList.add('_pc');
}


// SIDE PANEL

let panel = document.querySelector('#side__panel');
let mainContent = document.querySelector('main');
let fadeEl = document.querySelectorAll('.fade__el');
panel.style.padding = '0';
let cartBtn = document.querySelector('.openbtn');

function openNav() {
    if (window.innerWidth <= 820 && window.innerWidth > 460) {
        panel.style.width = '53%';
        mainContent.style.width = '100%';
    } else if (window.innerWidth <= 460) {
        panel.style.width = '80%';
        mainContent.style.width = '100%';
    } else {
        panel.style.width = '30%';
        mainContent.style.width = '70%';
    }

    for (let el of fadeEl) {
        el.classList.remove('showdown__ani');
        el.classList.add('showup__ani');
    }
    panel.style.padding = '15px';
    cartBtn.style.display = 'none';
}

function closeNav() {
    for (let el of fadeEl) {
        el.classList.remove('showup__ani');
        el.classList.add('showdown__ani');
    }
    panel.style.width = '0';
    mainContent.style.width = '100%';
    cartBtn.style.display = 'block';
    panel.style.padding = '0';
}

// document.window.addEventListener('onload', function() {
//     if (window.innerWidth <= 460) {
//         panel.style.width = '0';
//         mainContent.style.width = '100%';
//         cartBtn.style.display = 'block';
//         panel.style.padding = '0';
//     }
// })

// PRODUCT ARRAY

let productListObj = [
    {
        id: 1,
        name: 'JBL 305P MkII 5-inch Powered Studio Monitor Pair',
        price: 350.00,
        qty: 15,
        ordered: 0,
        productTotal: 0
    },
    {
        id: 2,
        name: 'Audio Technica ATH-R70x',
        price: 479.00,
        qty: 25,
        ordered: 0,
        productTotal: 0
    },
    {
        id: 3,
        name: 'Native Instruments 21066 Komplete Audio 6 MK2',
        price: 319.00,
        qty: 19,
        ordered: 0,
        productTotal: 0
    }
];

let totalPrice = 0;

// TOOLTIP AND BUTTON ANIMATION

let tooltip = document.querySelector('.tooltip');

function showTooltip() {
    tooltip.style.position = 'fixed';
    tooltip.style.opacity = '0.8';

    setTimeout(function () {
        tooltip.style.opacity = '0';
    }, 2000);
}

function btnAnimation() {
    let buttons = document.querySelectorAll('.add__to__cart_btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            btn.classList.add('animate-button');

            setTimeout(function () {
                btn.classList.remove('animate-button');
            }, 500);

            // showTooltip();
        });
    });
}

// ADDING TO CART LOGIC

let productQtyInput = document.querySelectorAll('#qtyInpt');

let checkoutTotal = document.querySelector('#checkoutTotal');

function addToCart(productId, inputId) {
    const productToAdd = productListObj.find((product) => product.id === productId);

    addToCartFunction(productToAdd, inputId);

    // updateCartInterface();
}

function addToCartFunction(product, inputId) {

    const productQtyInput = document.getElementById(inputId);
    const quantity = parseInt(productQtyInput.value);

    if (product.qty === 0) {
        alert('There is no more product available.');
    } else if (quantity > product.qty) {
        alert('Not enough product in stock.');
    } else if (quantity < 1) {
        alert('Invalid quantity. Please select at least 1 product.');
    } else {
        btnAnimation();
        showTooltip();
        // assignEventListenersToButtons();
        product.ordered += quantity;
        product.qty -= quantity;
        product.productTotal += product.price * quantity;
        totalPrice += product.price * quantity;

        checkoutTotal.innerHTML = '$' + totalPrice;
        // totalPrice += product.productTotal;

        //     // totlQty = 0;
        //     // totlQty += quantity;

        productQtyVisual(quantity);

        console.log('Added ' + product.name + ' ' + quantity + ' product(s) to the cart.');
        console.log('Remaining quantity in stock: ' + product.qty);
        console.log(product.name + ' Ordered: ' + product.ordered);
        // console.log('Total price: $' + product.productTotal);
        console.log('Total price: $' + totalPrice);

        console.log(product);

        updateCartInterface();

        //     // if (product.qty != 0) {
        //     //     assignEventListenersToButtons();
        //     // }
    }

}

// let productList = document.querySelector('#productList');

// function updateCartInterface() {
// }

function updateCartInterface() {
    let cartInfo = '<hr id="innerHr">';
    let total = document.querySelector('.total');

    for (const product of productListObj) {
        if (product.ordered > 0) {
            cartInfo += `<p>${product.name}<br>Quantity: ${product.ordered}<br>Price: $${product.productTotal.toFixed(2)}</p>`;
            // totalProducts += product.ordered;
            // totalPrice += product.productTotal;
            total.textContent = `$${totalPrice}`;

            cartInfo += `<button class='remove__btn_cart' onclick="removeFromCart(${product.id})">&#10005</button>`;
        }
    }

    // cartInfo += `<p>Total Products: ${totalProducts}</p>`;
    // cartInfo += `<p>Total Price: $${totalPrice.toFixed(2)}</p>`;

    document.getElementById("productList").innerHTML = cartInfo;
}

function removeFromCart(productId) {
    const productToRemove = productListObj.find((product) => product.id === productId);

    if (productToRemove) {

        // Returning product qty to the storage
        productToRemove.qty += productToRemove.ordered;

        // Reducing total in the cart
        totalPrice -= productToRemove.productTotal;
        productToRemove.productTotal = 0;

        // Reducing total quantity in the cart
        totlQty -= productToRemove.ordered;

        // Removing product from the cart
        productToRemove.ordered = 0;

        checkoutTotal.innerHTML = '$' + totalPrice;

        // Renewing cart interface
        updateCartInterface();

        // Renewing quantity in the cart
        productQtyVisualRemove();
        console.log(productToRemove);

        // Renewing total cost of the cart
        const total = document.querySelector('.total');
        // total.textContent = `$${(parseFloat(total.textContent.slice(1)) - totalPrice).toFixed(2)}`;
        total.textContent = `$${totalPrice.toFixed(2)}`;

        console.log(totalPrice);

        // Removing hr element from all products list
        const innHr = document.querySelector('#innerHr').remove();
    }

}

let productCounter = document.querySelector('.shopping__cart_counter');
let totlQty = 0;

function productQtyVisual(quantity) {
    totlQty += quantity;
    console.log(totlQty);
    if (productCounter.textContent === '0') productCounter.textContent = '';
    productCounter.textContent = totlQty;
}

function productQtyVisualRemove(quantity) {
    totlQty - quantity;
    console.log(totlQty);
    if (productCounter.textContent === '0') productCounter.textContent = '';
    productCounter.textContent = totlQty;
}

// CHECKOUT POPUP APPEARENCE AND DISAPPEARENCE

let checkoutBtn = document.querySelector('#checkoutBtn');
let popupSection = document.querySelector('#popupSection');
let blurFx = document.querySelectorAll('#blurFx');

checkoutBtn.addEventListener('click', function () {
    popupSection.style.display = 'block';
    blurFx.forEach(e => {
        e.style.filter = 'blur(5px)';
    });
    closeNav();
});

let closePopup = document.querySelector('#closePopup');

closePopup.addEventListener('click', function () {
    popupSection.style.display = 'none';
    blurFx.forEach(e => {
        e.style.filter = 'blur(0px)';
    });
    openNav();
});

// POPUP SUCCESSFULL ORDER APPEARENCE AND DISAPPEARENCE

let paymentForm = document.querySelector('#paymentForm');
let popupAlert = document.querySelector('#popupAlert');
let closePopAlert = document.querySelector('#closePopAlert');

paymentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Request to the server
    //....
    //....
    popupSection.style.display = 'none';
    popupAlert.style.display = 'block';
});

closePopAlert.addEventListener('click', function () {
    popupAlert.style.display = 'none';
    blurFx.forEach(e => {
        e.style.filter = 'blur(0px)';
    });
});



// BANK DATA AND BILLING VALIDATION

// Name on card validation

let cname = document.querySelector('#cname');

cname.addEventListener('input', function () {
    const userInput = cname.value;
    // const userInputUpperCase = userInput.toUpperCase();

    const latinLettersOnly = userInput.replace(/[^a-zA-Z ]/g, '');
    // cname.value = userInputUpperCase;
    cname.value = latinLettersOnly.toUpperCase();
});

// Card number validation

let ccnum = document.querySelector('#ccnum'),
    numbers = /[0-9]/,
    regExp = /[0-9]{4}/;

ccnum.addEventListener('input', (e) => {
    if (e.inputType === 'insertText' && !numbers.test(e.data) || ccnum.value.length > 19) {
        ccnum.value = ccnum.value.slice(0, ccnum.value.length - 1);
        return;
    }

    // Backspace feature and delete
    let value = ccnum.value;
    if (e.inputType === 'deleteContentBackward' && regExp.test(value.slice(-4))) {
        ccnum.value = ccnum.value.slice(0, ccnum.value.length - 1);
        return
    }

    // Adding backspace after 4 digits in a row
    if (regExp.test(value.slice(-4)) && value.length < 19) {
        ccnum.value += ' ';
    }
});

// Expire month/year and cvv validation

let expmonth = document.querySelector('#expmonth');

expmonth.addEventListener('input', function () {
    // const pattern = /^(0[1-9]|1[0-2])$/;
    const value = expmonth.value;
    if (value > '12' || !value) {
        expmonth.value = '';
    }
});

let expyear = document.querySelector('#expyear');

expyear.addEventListener('input', function() {
    const userValue = expyear.value;
    const date = new Date;
    const currentYearStr = (date.getFullYear() % 100).toString();
    const currentYearNum = (date.getFullYear() % 100);

    const userValInt = parseInt(userValue);

    if (userValue < currentYearStr && userValue.length == 2 || userValInt > (currentYearNum + 5)) {
        expyear.value = '';
    }
});

let cvv = document.querySelector('#cvv');

cvv.addEventListener('input', function() {
    const cvvValue = cvv.value;

    if (!/^\d+$/.test(cvvValue)) {
        cvv.value = '';
    }
});

// MENU BURGER

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener('click', function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}


// PAGE NAVIGATION

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            let gotoBlock = document.querySelector(menuLink.dataset.goto);
            let gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}