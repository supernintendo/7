/// <reference path="./classes/store.ts"/>

class App {
    productList: Store.ProductList;
    shoppingCart: Store.ShoppingCart;

    constructor() {
        this.productList = new Store.ProductList();
        this.shoppingCart = new Store.ShoppingCart();
    }
}

var app = new App();
