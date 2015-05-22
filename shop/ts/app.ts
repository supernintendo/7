/// <reference path="./references.ts"/>

class App {
    navButtons: Navbar.Buttons;
    productCategories: Array<Store.ProductCategory>;
    shoppingCart: Cart.ShoppingCart;

    constructor() {
        this.navButtons = new Navbar.Buttons();
        this.shoppingCart = new Cart.ShoppingCart('[data-view="shopping-cart"]');
        this.productCategories = [
            new Store.ProductCategory({
                remote: "test.json",
                title: "product category"
            }, '[data-view="product-list"]'),
            new Store.ProductCategory({
                remote: "test2.json",
                title: "product category 2"
            }, '[data-view="product-list-2"]')
        ];
    }
}

var Shop = new App();
Helper.navigateToShop();
