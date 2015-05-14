/// <reference path="./component.ts"/>

module Store {
    export class ProductList extends Component.View {
        constructor(target: string) {
            var params: Component.Params = {
                source: "[data-component='product-list']",
                target: target
            }
            super(params);
        }
    }
    export class ShoppingCart extends Component.View {
        constructor(target: string) {
            var params: Component.Params = {
                source: "[data-component='shopping-cart']",
                target: target
            }
            super(params);
        }
    }
}
