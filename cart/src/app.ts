/// <reference path="./references.ts"/>

var APP: App;

class App {
    navButtons: Navbar.Buttons;
    productCategories: Array<Store.ProductCategory>;
    shoppingCart: Cart.ShoppingCart;

    constructor() {
        this.navButtons = new Navbar.Buttons();
        this.productCategories = [
            new Store.ProductCategory({
                remote: "products.json",
                title: "✨ Check out these great products of the cosmos. ✨"
            }, '[data-view="product-list"]')
        ];
        this.shoppingCart = new Cart.ShoppingCart('[data-view="shopping-cart"]');
    }
}

Helper.ready(function() {
    APP = new App();
    Helper.navigateToShop();
});

// Fancy scroll.
window.onscroll = function() {
    let slipIn: HTMLScriptElement = <HTMLScriptElement>document.getElementById('space-slip-in'),
        pos: Number = window.scrollY / 2;

    slipIn.style.backgroundPosition = '0px ' + pos + 'px';
}