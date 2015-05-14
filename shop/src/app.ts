/// <reference path="./classes/store.ts"/>

class App {
    productList: Store.ProductList;
    productPage: Store.ProductPage;
    shoppingCart: Store.ShoppingCart;

    constructor() {
        this.productList = new Store.ProductList('#product-list');
        this.productPage = new Store.ProductPage('#product-page');
        this.shoppingCart = new Store.ShoppingCart('#shopping-cart');
    }
}

var app = new App();
