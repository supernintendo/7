/// <reference path="../references.ts"/>

module Navbar {
    export class Buttons extends Component.View {
        backToShopButton: HTMLScriptElement;
        viewCartButton: HTMLScriptElement;

        constructor() {
            let params: Spec.Component = {
                attributes: null,
                source: '[data-component="nav-buttons"]',
                target: '[data-view="nav-buttons"]'
            }
            super(params);
            this.render();
            this.assignButtons();
            this.addListeners();
        }
        addListeners() {
            this.backToShopButton.addEventListener('click', Helper.navigateToShop);
            this.viewCartButton.addEventListener('click', Helper.navigateToCart);
        }
        assignButtons() {
            this.backToShopButton = Helper.selector(this.target, '[data-control="back-to-store"]');
            this.viewCartButton = Helper.selector(this.target, '[data-control="view-cart"]');
        }
        updateViewCartButtonDisplay() {
            let quantity = Helper.getNumberOfItemsInCart();

            if (quantity > 0) {
                this.viewCartButton.innerHTML = `View Cart (${quantity})`;
            } else {
                this.viewCartButton.innerHTML = 'View Cart';
            }
        }
    }
}
