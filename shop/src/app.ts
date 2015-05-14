/// <reference path="./classes/store.ts"/>

class App {
    productList: Store.ProductList;
    productListTwo: Store.ProductList;
    shoppingCart: Store.ShoppingCart;

    constructor() {
        this.productList = new Store.ProductList('[data-view="product-list"]');
        this.productListTwo = new Store.ProductList('[data-view="product-list-two"]');
        this.shoppingCart = new Store.ShoppingCart('[data-view="shopping-cart"]');
    }
}

var app = new App();
