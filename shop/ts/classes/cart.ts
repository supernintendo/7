/// <reference path="../references.ts"/>

module Cart {
    export class CartItem extends Component.View {
        constructor(attributes: Spec.CartItem, target: string) {
            var params: Spec.Component = {
                attributes: {
                    price: attributes.product.price,
                    name: attributes.product.name
                },
                source: '[data-component="shopping-cart-item"]',
                target: target
            }
            super(params);
            this.render();
        }
    }
    export class ShoppingCart extends Component.View {
        cartItems: Array<CartItem>;

        constructor(target: string) {
            var params: Spec.Component = {
                attributes: <Spec.ShoppingCart>{
                    items: new Array<Spec.CartItem>(),
                    subtotal: this.getSubtotal.bind(this)
                },
                source: '[data-component="shopping-cart"]',
                target: target
            }
            this.cartItems = new Array<CartItem>();
            super(params);
            this.render();
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
        prepareCartItems() {
            var i: number,
                views: Array<string> = Helper.generateArray(this.attributes.items.length, this.placeViews.bind(this, 'cart-item-', 'tr'));

            Helper.selector(this.target, 'tbody').innerHTML = views.join('');

            for (i = 0; i < this.attributes.items.length; i++) {
                this.cartItems.push(new CartItem(
                   this.attributes.items[i],
                    `[data-view="cart-item-${i}"]`
                ));
            }
        }
        render() {
            this.renderContent();
            this.prepareCartItems();
            this.hide();
        }
    }
}
