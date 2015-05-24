/// <reference path="../references.ts"/>

module Cart {
    export class ShoppingCart extends Component.View {
        constructor(target: string) {
            var params: Spec.Component = {
                attributes: <Spec.ShoppingCart>{
                    items: [],
                    subtotal: this.getSubtotal.bind(this)
                },
                source: '[data-component="shopping-cart"]',
                target: target
            }
            super(params);
            this.render();
            this.prepareRows();
            this.hide();
        }
        addToCart(product) {
            var matches: Array<Spec.CartItem> = this.attributes.items.filter(
                this.checkIfItemIsInCart.bind(this, product)
            );
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
        checkIfItemIsInCart(product, cartItem) {
            return product.id === cartItem.product.id;
        }
        getSubtotal() {
            var subtotal = this.attributes.items.reduce(this.itemsToSubtotal, 0);

            return '$' + subtotal.toFixed(2);
        }
        getTotalNumberOfItems() {
            var quantity = this.attributes.items.reduce(this.itemsToQuantity, 0);

            return quantity;
        }
        itemsToSubtotal(previous, current) {
            return previous + current.product.price * current.quantity;
        }
        itemsToQuantity(previous, current) {
            return previous + current.quantity;
        }
        prepareRows() {
            // var i: number,
            //     rows: this.attributes.items.map(this.tableRow),
            //     views: Array<string> = Helper.generateArray(this.attributes.items.length, this.placeViews.bind(this, 'cart-item-'));

            // Helper.selector(this.target, 'tbody').innerHTML = views.join('');
        }
    }
}
