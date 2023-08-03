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
    tooltip.style.opacity = '0.8';

    setTimeout(function () {
        tooltip.style.opacity = '0';
    }, 2000);
}

function btnAnimation() {
    let buttons = document.querySelectorAll('.add__to__cart_btn');

    buttons.forEach(btn => {
        btn.classList.add('animate-button');

        setTimeout(function () {
            btn.classList.remove('animate-button');
        }, 500);
    });


}

// ADDING TO CART LOGIC

let productQtyInput = document.querySelectorAll('#qtyInpt');

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
        // productToRemove.productTotal = 0;

        // Reducing total quantity in the cart
        totlQty -= productToRemove.ordered;

        // Removing product from the cart
        productToRemove.ordered = 0;

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

        let innHr = document.querySelector('#innerHr').remove();
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


// window.onload = function () {
//     let productItems = document.querySelectorAll('.product__img');

//     productItems.forEach(productItem => {
//         productItem.addEventListener('dragstart', function (evt) {
//             evt.dataTransfer.effectAllowed = 'move';
//             evt.dataTransfer.setData('Text', this.id);
//         });
//     }, false);

//     // productItem.addEventListener('dragend', function (evt) {

//     // })

//     let shoppingCart = document.querySelector('#shoppingCart');

//     shoppingCart.addEventListener('dragover', function (evt) {
//         if (evt.preventDefault) evt.preventDefault();
//         return false;
//     }, false);

//     shoppingCart.addEventListener('dragenter', function (evt) {
//         this.classList.add('box__shadow');
//         lastShoppingCart = this;
//         evt.preventDefault();
//     }, false);

//     shoppingCart.addEventListener('drop', function (evt) {
//         this.classList.remove('box__shadow');
//         productQtyVisual();
//         // createNewElements(evt);
//         dropOccured = true; // Flag that means that drop event was occured
//         evt.preventDefault();

//     }, false);

//     shoppingCart.addEventListener('dragleave', function (evt) {
//         if (!dropOccured) {
//             setTimeout(function () {
//                 lastShoppingCart.classList.remove('box__shadow');
//             }, 1000);
//         }
//         dropOccured = false;
//         evt.preventDefault();
//         evt.stopPropagation();
//     }, false);

// }

// NEW ELEMENTS CREATOR

// let productList = document.querySelector('#productList');

// function createNewElements(evt) {
//     let productId = evt.dataTransfer.getData('Text');
//     let product = productListObj.find(item => item.id === parseInt(productId));

//     if (product && product.qty > 0) {
//         product.ordered++;
//         product.qty--;
//         console.log(productListObj);
//         let listHr = document.createElement('hr');
//         let listContainer = document.createElement('div');
//         listContainer.classList.add('product__list_price')
//         let listItem = document.createElement('p');
//         listItem.textContent = `${product.name}: (${product.ordered})`;
//         productList.appendChild(listHr);
//         productList.appendChild(listContainer);
//         listContainer.appendChild(listItem);
//     }
// }


// SHOPPING CART

// $('.product__img').draggable({
//     revert: true,

//     drag: function () {
//         $(this).addClass('active');
//         $(this).closest('.product__container').addClass('active');
//     },

//     stop: function () {
//         $(this).removeClass('active').closest('.product__container').removeClass('active');
//     }
// });

// $('#shoppingCart').droppable({
//     activeClass: 'active',
//     hoverClass: 'hover',
//     tolerance: 'touch',
//     drop: function (event, ui) {
//         let basket = $(this),
//             move = ui.draggable,
//             itemId = basket.find(".product__container div[data-id='" + move.attr("data-id") + "']");

//         if (itemId.html() != null) {
//             itemId.find(".count__product_list").text(parseInt(itemId.find(".count__product_list").text()) + 1);
//         }
//         else {
//             addBasket(basket, move);
//         }
//     }
// });

// function addBasket(basket, move) {
//     let productId = move.attr("data-id");
//     let product = getProductById(productId);

//     let itemId = basket.find(".product__container div").filter(function () {
//         return $(this).attr("data-id") === productId;
//     });

//     if (itemId.length > 0) {
//         let quantityElement = itemId.find(".count__product_list");
//         let quantity = parseInt(quantityElement.text());
//         quantityElement.text(quantity + 1);
//     } else {
//         var newItem = $('<hr>'
//             + '<div data-id="' + productId + '" class="product__list_price">'
//             + '<span class="name__product_list">' + product.name + '</span>'
//             + '<span class="price__product_list">$' + product.price + '</span>'
//             + '<p class="count__product_list">1</p>'
//             + '<button class="delete__product_list">&#10005;</button></div>');

//         basket.find("#productList").append(newItem);

//         newItem.hide().slideDown(500);
//     }

//     updateTotalPrice(basket);

// }

// function getProductById(productId) {
//     let product = productListObj.find(function (item) {
//         return item.id == productId;
//     });

//     return product ? product : { id: 0, name: "", price: 0 };
// }

// function updateTotalPrice(basket) {
//     let total = 0;
//     basket.find(".product__container div").each(function () {
//         let price = parseInt($(this).find(".price__product_list").text().substr(1));
//         let quantity = parseInt($(this).find(".count__product_list").text());
//         total += price * quantity;
//     });

//     basket.find('.total').text(total);
// }

// $('.products__list div').on('click', '.product__list_price button.delete__product_list', function () {
//     $(this).closest('.product__list_price').slideUp(500, function () {
//         $(this).remove();
//         updateTotalPrice($(this).closest('.products__list'));
//     });
// });


// $('.')
//     .bind('dragstart', function(evt) {
//         evt.dataTransfer.setData('text', this.id);
//         $('.shopping__cart_hint').fadeIn('fast');
//     });
//     // .hover(
//     //     function() {
//     //         $('.product__img img', this).fadeIn();
//     //     },
//     //     function() {
//     //         $('.product__img', this).fadeOut();
//     //     }
//     // )

// $('.shopping__cart_img')
//     .bind('dragover', function(evt) {
//         evt.preventDefault();
//     })
//     .bind('dragenter', function(evt) {
//         evt.preventDefault();
//     })
//     .bind('drop', function(evt) {

//     });

// let id = evt.dataTransfer.getData('text'),
//     item = $('#' + id),
//     cartList = $(".list__accordeon div"),
//     total = $(".total__div .total"),
//     price = $('.price').text(),
//     prevCartItem = null,
//     notInCart = (function() {
//         let lis = $('li', cartList),
//             len = lis.length,
//             i;

//         for (i = 0; i < len; i++) {
//             let temp = $(lis[i]);
//             if (temp.data('id') === id) {
//                 prevCartItem = temp;
//                 return false;
//             }
//         }
//         return true;
//     } ()),
//     quantLeftEl, quantBpughtEl, quantLeft;

// $('.item')
//     .bind('dragstart', function (evt) {
//         evt.dataTransfer.setData('text', this.id);
//         $('.total__div h2').fadeIn('fast');
//     })
//     .hover(
//         function () { $('div', this).fadeIn(); },
//         function () { $('div', this).fadeOut(); }
//     );

// $('#cart')
//     .bind('dragover', function (evt) {
//         evt.preventDefault();
//     })
//     .bind('dragenter', function (evt) {
//         evt.preventDefault();
//     })
//     .bind('drop', function (evt) {
//         var id = evt.dataTransfer.getData('text'),
//             item = $('#' + id),
//             cartList = $("#cart ul"),
//             total = $("#total span"),
//             price = $('p:eq(1) span', item).text(),
//             prevCartItem = null,
//             notInCart = (function () {
//                 var lis = $('li', cartList),
//                     len = lis.length,
//                     i;

//                 for (i = 0; i < len; i++) {
//                     var temp = $(lis[i]);
//                     if (temp.data('id') === id) {
//                         prevCartItem = temp;
//                         return false;
//                     }
//                 }
//                 return true;
//             }()),
//             quantLeftEl, quantBoughtEl, quantLeft;

//         $(".total__div h2").fadeOut('fast');

//         if (notInCart) {
//             prevCartItem = $('<li />', {
//                 text: $('p:first', item).text(),
//                 data: { id: id }
//             }).prepend($('<span />', {
//                 'class': 'quantity',
//                 text: '0'
//             })).prepend($('<span />', {
//                 'class': 'price',
//                 text: price
//             })).appendTo(cartList);
//         }

//         quantLeftEl = $('p:last span', item);
//         quantLeft = parseInt(quantLeftEl.text(), 10) - 1;
//         quantBoughtEl = $('.quantity', prevCartItem);
//         quantBoughtEl.text(parseInt(quantBoughtEl.text(), 10) + 1);
//         quantLeftEl.text(quantLeft);

//         if (quantLeft === 0) {
//             item.fadeOut('fast');
//         }

//         total.text((parseFloat(total.text(), 10) + parseFloat(price.split('$')[1])).toFixed(2));

//         evt.stopPropagation();
//         return false;
//     });







