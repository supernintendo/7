/// <reference path="./references.ts"/>

class App {
    productList: Store.ProductCategory;
    shoppingCart: Store.ShoppingCart;

    constructor() {
        var testProductCategory: Spec.ProductCategory = {
            title: "product category",
            products: new Data.Products('test')
        },
        testRequest = new Ajax.Get('json/test.json', function(response: any) {
            console.log(response);
        });

        this.productList = new Store.ProductCategory(testProductCategory, '[data-view="product-list"]');
        this.shoppingCart = new Store.ShoppingCart('[data-view="shopping-cart"]');
    }
}

var app = new App();