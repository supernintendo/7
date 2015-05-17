/// <reference path="../references.ts"/>

module Store {
    export class Product extends Component.View {
        constructor(product: Spec.Product, target: string) {
            var params: Spec.Component = {
                attributes: product,
                source: "[data-component='product-list-row']",
                target: target
            }

            super(params);
        }
    }
    export class ProductCategory extends Component.View {
        constructor(attributes: Spec.ProductCategory, target: string) {
            var params: Spec.Component = {
                attributes: attributes,
                source: "[data-component='product-list']",
                target: target
            }
            super(params);
        }
    }
    export class ShoppingCart extends Component.View {
        constructor(target: string) {
            var params: Spec.Component = {
                attributes: null,
                source: "[data-component='shopping-cart']",
                target: target
            }
            super(params);
        }
    }
}
