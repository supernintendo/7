/// <reference path="./references.ts"/>

class App {
    productList: Store.ProductCategory;
    productListTwo: Store.ProductCategory;
    shoppingCart: Store.ShoppingCart;

    constructor() {
        var testProductCategory: Spec.ProductCategory = {
            title: "product category"
        };

        this.productList = new Store.ProductCategory(testProductCategory, '[data-view="product-list"]');
        this.shoppingCart = new Store.ShoppingCart('[data-view="shopping-cart"]');
    }
}

var app = new App();
