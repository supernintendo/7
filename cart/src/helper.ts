module Helper {
    export function getNumberOfItemsInCart() {
        if (APP) {
            return APP.shoppingCart.getTotalNumberOfItems()
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
        APP.shoppingCart.hide();
        APP.productCategories.forEach(category => category.show());
        APP.navButtons.backToShopButton.style.display = 'none';
        APP.navButtons.viewCartButton.style.display = '';
    }
    export function navigateToCart() {
        APP.shoppingCart.show();
        APP.productCategories.forEach(category => category.hide());
        APP.navButtons.backToShopButton.style.display = '';
        APP.navButtons.viewCartButton.style.display = 'none';
    }
    export function ready(callback: Function) {
        if (document.readyState !== 'loading'){
            callback();
        } else {
            document.addEventListener('DOMContentLoaded', ready.bind(this, callback));
        }
    }
}
