module Helper {
    export function getNumberOfItemsInCart() {
        if (Shop) {
            return Shop.shoppingCart.getTotalNumberOfItems()
        } else {
            return 0;
        }
    }
    export function generateArray(n: number, func: Function) {
        return Array.apply(null, Array(n)).map(func);
    }
    export function selector(root: any, selector: string) {
        return <HTMLScriptElement>root.querySelector(selector);
    }
    export function navigateToShop() {
        Shop.shoppingCart.hide();
        Shop.productCategories.forEach(function(productCategory) {
            productCategory.show();
        });
        Shop.navButtons.backToShopButton.style.display = 'none';
        Shop.navButtons.viewCartButton.style.display = '';
    }
    export function navigateToCart() {
        Shop.shoppingCart.show();
        Shop.productCategories.forEach(function(productCategory) {
            productCategory.hide();
        });
        Shop.navButtons.backToShopButton.style.display = '';
        Shop.navButtons.viewCartButton.style.display = 'none';
    }
    export function ready(callback: Function) {
        if (document.readyState !== 'loading'){
            callback();
        } else {
            document.addEventListener('DOMContentLoaded', ready.bind(this, callback));
        }
    }
}
