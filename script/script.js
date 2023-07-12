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
    panel.style.width = '30%';
    mainContent.style.width = '70%';
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

// TOOLTIP

let addToCartBtnWrappers = document.querySelectorAll('.input__group_wrapper');

addToCartBtnWrappers.forEach(wrapper => {
    let addToCartBtn = wrapper.querySelectorAll('.add__to__cart_btn[data-tooltip]');
    let tooltip = wrapper.querySelector('.tooltip');

    addToCartBtn.forEach(button => {
        button.addEventListener('click', function (e) {
            tooltip.style.opacity = '1';

            setTimeout(function () {
                tooltip.style.opacity = '0';
            }, 2000);

            addToCartBtn.classList.add('animate-button');

            setTimeout(function () {
                addToCartBtn.classList.remove('animate-button');
            }, 500);

            e.preventDefault();
        });
    });
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


// DRAG & DROP FEATURE

let productListObj = [
    {
        id: 0,
        name: 'JBL 305P MkII 5-inch Powered Studio Monitor Pair',
        price: 350.00,
        qty: 15,
        ordered: 0
    },
    {
        id: 1,
        name: 'Audio Technica ATH-R70x',
        price: 479.00,
        qty: 25,
        ordered: 0
    },
    {
        id: 2,
        name: 'Native Instruments 21066 Komplete Audio 6 MK2',
        price: 319.00,
        qty: 19,
        ordered: 0
    }
];

let lastShoppingCart;
let dropOccured = false;

window.onload = function () {
    let productItems = document.querySelectorAll('.product__img');

    productItems.forEach(productItem => {
        productItem.addEventListener('dragstart', function (evt) {
            evt.dataTransfer.effectAllowed = 'move';
            evt.dataTransfer.setData('Text', this.id);
        });
    }, false);

    // productItem.addEventListener('dragend', function (evt) {

    // })

    let shoppingCart = document.querySelector('#shoppingCart');

    shoppingCart.addEventListener('dragover', function (evt) {
        if (evt.preventDefault) evt.preventDefault();
        return false; 
    }, false);

    shoppingCart.addEventListener('dragenter', function (evt) {
        this.classList.add('box__shadow');
        lastShoppingCart = this;
        evt.preventDefault();
    }, false);

    shoppingCart.addEventListener('drop', function (evt) {
        this.classList.remove('box__shadow');
        productQtyVisual();
        createNewElements(evt);
        dropOccured = true; // Flag that means that drop event was occured
        evt.preventDefault();
        
    }, false);
    
    shoppingCart.addEventListener('dragleave', function (evt) {
        if (!dropOccured) {
            setTimeout(function() {
                lastShoppingCart.classList.remove('box__shadow');
            }, 1000);
        }
        dropOccured = false;
        evt.preventDefault();
        evt.stopPropagation();
    }, false);

}

// NEW ELEMENTS CREATOR

function createNewElements(evt) {
    let productId = evt.dataTransfer.getData('Text');
    let product = productListObj.find(item => item.name === productId);
    let productList = document.querySelector('#productList');

    if (product && product.qty > 0) {
        product.ordered++;
        product.qty--;
        console.log(productListObj);
        let listHr = document.createElement('hr');
        let listContainer = document.createElement('div');
        // listContainer.classList.add('product__list_price')
        let listItem = document.createElement('p');
        listItem.textContent = `${product.name}: (${product.ordered})`;
        productList.appendChild(listHr);
        productList.appendChild(listContainer);
        listContainer.appendChild(listItem);
    }
}


// COUNTER

// let totalProductListObj = new Object();



// let totalCost


let productCounter = document.querySelector('.shopping__cart_counter');

function productQtyVisual() {
    if (productCounter.textContent === '0') productCounter.textContent = '';
    productCounter.textContent++;
}

