/// <reference path="./references.ts"/>

class App {
    navButtons: Navbar.Buttons;
    productList: Store.ProductCategory;
    shoppingCart: Cart.ShoppingCart;

    constructor() {
        var testProductCategory: Spec.ProductCategory = {
            remote: "test.json",
            title: "product category"
        };

        this.navButtons = new Navbar.Buttons();
        this.productList = new Store.ProductCategory(testProductCategory, '[data-view="product-list"]');
        this.shoppingCart = new Cart.ShoppingCart('[data-view="shopping-cart"]');
    }
}

var Shop = new App();
Helper.navigateToShop();
