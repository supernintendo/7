/// <reference path="../references.ts"/>

module Cart {
    export class CartItem extends Component.View {
        item: Spec.Product;

        constructor(attributes: Spec.CartItem, target: string) {
            let params: Spec.Component = {
                attributes: {
                    image: attributes.product.image,
                    name: attributes.product.name,
                    price: this.getFormattedPrice.bind(this, attributes.product.price),
                    quantity: attributes.quantity,
                    totalPrice: this.getTotalPrice.bind(this, attributes.product.price, attributes.quantity)
                },
                source: '[data-component="shopping-cart-item"]',
                target: target
            }
            super(params);
            this.render();
            this.item = attributes.product;
            this.addListener();
        }
        addListener() {
            let input: HTMLScriptElement = Helper.selector(this.target, '[data-control="quantity-input"]');

            input.addEventListener('blur', this.changeQuantity.bind(this));
            input.addEventListener('keyup', this.checkKeyUp.bind(this));
        }
        checkKeyUp(e: KeyboardEvent) {
            if (e.keyCode === 13) {
                let input: HTMLScriptElement = Helper.selector(this.target, '[data-control="quantity-input"]');

                input.blur();
            }
        }
        changeQuantity(e: Event) {
            let target: HTMLInputElement = <HTMLInputElement>e.target;

            APP.shoppingCart.setQuantityOfItem(this.item, Number(target.value));
        }
        getContainer() {
            return <HTMLScriptElement>this.target;
        }
        getFormattedPrice(price: number) {
            return '$' + price.toFixed(2);
        }
        getTotalPrice(price: number, quantity: number) {
            return '$' + (price * quantity).toFixed(2);
        }
    }
    export class ShoppingCart extends Component.View {
        cartItems: Array<CartItem>;

        constructor(target: string) {
            let params: Spec.Component = {
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
            this.hide();
        }
        addListener() {
            let checkoutButton: HTMLScriptElement = Helper.selector(this.target, '[data-control="checkout-button"]');

            checkoutButton.addEventListener('click', this.checkout);
        }
        addToCart(product) {
            let matches: Array<Spec.CartItem> = this.checkFor(product);

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
            APP.navButtons.updateViewCartButtonDisplay();
            this.hide();
        }
        checkFor(product: Spec.Product) {
            return this.attributes.items.filter(this.itemsInCart.bind(this, product));
        }
        checkout() {
            window.location.href = 'https://www.youtube.com/watch?v=l8C09N6YvYc';
        }
        getSubtotal() {
            let subtotal = this.attributes.items.reduce(this.itemsToSubtotal, 0);

            return '$' + subtotal.toFixed(2);
        }
        getTotalNumberOfItems() {
            let quantity = this.attributes.items.reduce(this.itemsToQuantity, 0);

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
            let i: number,
                tableBody: HTMLScriptElement = Helper.selector(this.target, 'tbody'),
                views: Array<string> = Helper.generateArray(this.attributes.items.length, this.placeViews.bind(this, 'cart-item-', 'tr'));

            tableBody.innerHTML = views.join('');

            for (i = 0; i < this.attributes.items.length; i++) {
                this.cartItems.push(new CartItem(
                   this.attributes.items[i],
                    `[data-view="cart-item-${i}"]`
                ));
            }
        }
        removeItemFromCart(product) {
            let i: number;

            for (i = 0; i < this.attributes.items.length; i++) {
                if (this.attributes.items[i].product.id === product.id) {
                    this.attributes.items.splice(i, 1);
                    break;
                }
            }
        }
        setQuantityOfItem(product, quantity) {
            let matches: Array<Spec.CartItem> = this.checkFor(product);

            if (quantity <= 0) {
                this.removeItemFromCart(product);
            } else {
                matches[0].quantity = quantity;
            }
            this.render();
            APP.navButtons.updateViewCartButtonDisplay();
        }
        render() {
            this.renderContent();
            this.addListener();
            this.prepareCartItems();
        }
    }
}
