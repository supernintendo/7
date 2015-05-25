/// <reference path="../references.ts"/>

module Cart {
    export class ShoppingCart extends Component.View {
        constructor(target: string) {
            var params: Spec.Component = {
                attributes: <Spec.ShoppingCart>{
                    items: new Array<Spec.CartItem>(),
                    subtotal: this.getSubtotal.bind(this)
                },
                source: '[data-component="shopping-cart"]',
                target: target
            }
            super(params);
            this.render();
            this.hide();
        }
        addToCart(product) {
            var matches: Array<Spec.CartItem> = this.checkFor(product);

            /* Increase quantity of item if it is in the cart, otherwise
               add it. */
            if (matches.length > 0) {
                matches[0].quantity++;
            } else {
                this.attributes.items.push(<Spec.CartItem>{
                    product: product,
                    quantity: 1
                });
            }
            this.render();
            this.hide();
        }
        checkFor(product: Spec.Product) {
            return this.attributes.items.filter(this.itemsInCart.bind(this, product));
        }
        getSubtotal() {
            var subtotal = this.attributes.items.reduce(this.itemsToSubtotal, 0);

            return '$' + subtotal.toFixed(2);
        }
        getTotalNumberOfItems() {
            var quantity = this.attributes.items.reduce(this.itemsToQuantity, 0);

            return quantity;
        }
        itemsInCart(product, cartItem) {
            return product.id === cartItem.product.id;
        }
        itemsToQuantity(previous, current) {
            return previous + current.quantity;
        }
        itemsToSubtotal(previous, current) {
            return previous + current.product.price * current.quantity;
        }
    }
}
