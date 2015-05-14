/// <reference path="./references.ts"/>

class App {
    productList: Store.ProductCategory;
    productListTwo: Store.ProductCategory;
    shoppingCart: Store.ShoppingCart;

    constructor() {
        this.productList = new Store.ProductCategory('[data-view="product-list"]');
        this.shoppingCart = new Store.ShoppingCart('[data-view="shopping-cart"]');
    }
}

var app = new App();
