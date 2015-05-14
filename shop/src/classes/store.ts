/// <reference path="../references.ts"/>

module Store {
    export class ProductCategory extends Component.View {
        constructor(target: string) {
            var params: Component.Params = {
                attributes: null,
                source: "[data-component='product-list']",
                target: target
            }
            super(params);
        }
    }
    export class ShoppingCart extends Component.View {
        constructor(target: string) {
            var params: Component.Params = {
                attributes: null,
                source: "[data-component='shopping-cart']",
                target: target
            }
            super(params);
        }
    }
}
