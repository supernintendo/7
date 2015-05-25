/// <reference path="./references.ts"/>

var Shop: App;

class App {
    navButtons: Navbar.Buttons;
    productCategories: Array<Store.ProductCategory>;
    shoppingCart: Cart.ShoppingCart;

    constructor() {
        this.navButtons = new Navbar.Buttons();
        this.productCategories = [
            new Store.ProductCategory({
                remote: "test.json",
                title: "product category"
            }, '[data-view="product-list"]')
        ];
        this.shoppingCart = new Cart.ShoppingCart('[data-view="shopping-cart"]');
    }
}

Helper.ready(function() {
    Shop = new App();
    Helper.navigateToShop();
});
