/// <reference path="../references.ts"/>

module Store {
    export class Product extends Component.View {
        constructor(attributes: Spec.Product, target: string) {
            let params: Spec.Component = {
                attributes: attributes,
                source: '[data-component="product"]',
                target: target
            }
            super(params);
            this.render();
            this.addListener();
        }
        addListener() {
            let button: HTMLScriptElement = Helper.selector(this.target, '[data-control="add-to-cart-button"]');

            button.addEventListener('click', this.addToCart.bind(this));
            button.addEventListener('touchend', this.addToCart.bind(this));
        }
        addToCart() {
            APP.shoppingCart.addToCart(this.attributes);
        }
    }
    export class ProductCategory extends Component.View {
        productRows: Array<ProductRow>;

        constructor(attributes: Spec.ProductCategory, target: string) {
            let params: Spec.Component = {
                attributes: attributes,
                source: '[data-component="product-list"]',
                target: target
            }
            super(params);
            this.productRows = new Array<ProductRow>();
            this.render();
            this.fetchRemote();
        }
        ajaxResponse(response: any) {
            let i: number,
                rows: number = Math.ceil(response.data.length / 3),
                element: HTMLScriptElement = Helper.selector(this.target, '.product-list-rows'),
                views: Array<string> = Helper.generateArray(rows, this.placeViews.bind(this, 'product-row-', 'div'));

            element.innerHTML = views.join('');

            // Three items per row.
            for (i = 0; i < rows; i++) {
                this.productRows.push(new ProductRow(
                    response.data.slice(i * 3, i * 3 + 3).map(this.toProductSpec),
                    `[data-view="product-row-${i}"]`
                ));
            }
        }
        toProductSpec(attributes: any) {
            return <Spec.Product>attributes;
        }
    }
    export class ProductRow extends Component.View {
        products: Array<Product>;

        constructor(products: Array<Spec.Product>, target: string) {
            let params: Spec.Component = {
                attributes: null,
                source: '[data-component="product-list-row"]',
                target: target
            }
            super(params);
            this.products = new Array<Product>();
            this.render();
            this.prepareProducts(products);
        }
        prepareProducts(products: Array<Spec.Product>) {
            let i: number,
                views: Array<string> = Helper.generateArray(products.length, this.placeViews.bind(this, 'product-', 'div'));

            this.target.innerHTML = views.join('');

            for (i = 0; i < products.length; i++) {
                this.products.push(new Product(
                    products[i],
                    `[data-view="${this.target.dataset['view']}"] [data-view="product-${i}"]`
                ));
            }
        }
    }
}
