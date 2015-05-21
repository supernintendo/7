/// <reference path="../references.ts"/>

module Store {
    export class ProductCategory extends Component.View {
        productRows: Array<ProductRow>;

        constructor(attributes: Spec.ProductCategory, target: string) {
            var params: Spec.Component = {
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
            var i: number,
                rows: number = Math.ceil(response.data.length / 3),
                element: HTMLScriptElement = Helper.selector(this.target, '.product-list-rows'),
                views: Array<string> = Helper.generateArray(rows, this.placeViews.bind(this, 'product-row-'));

            element.innerHTML = views.join('');

            for (i = 0; i < rows; i++) {
                this.productRows.push(new ProductRow(`[data-view="product-row-${i}"]`));
            }
        }
    }
    export class ProductRow extends Component.View {
        constructor(target: string) {
            var params: Spec.Component = {
                attributes: null,
                source: '[data-component="product-list-row"]',
                target: target
            }
            super(params);
            this.render();
        }
    }
    export class ShoppingCart extends Component.View {
        constructor(target: string) {
            var params: Spec.Component = {
                attributes: null,
                source: '[data-component="shopping-cart"]',
                target: target
            }
            super(params);
            this.render();
        }
    }
}
