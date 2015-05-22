/// <reference path="../references.ts"/>

module Cart {
    export class ShoppingCart extends Component.View {
        constructor(target: string) {
            var params: Spec.Component = {
                attributes: null,
                source: '[data-component="shopping-cart"]',
                target: target
            }
            super(params);
            this.render();
            this.hide();
        }
    }
}
