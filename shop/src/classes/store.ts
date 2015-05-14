/// <reference path="./component.ts"/>

module Store {
    export class ProductList extends Component.View {
        constructor() {
            var params: Component.Params = {
                source: "[data-component='product-list']",
                target: "[data-view='product-list']"
            }
            super(params);
        }
    }
    export class ShoppingCart extends Component.View {
        constructor() {
            var params: Component.Params = {
                source: "[data-component='shopping-cart']",
                target: "[data-view='shopping-cart']"
            }
            super(params);
        }
    }
}
