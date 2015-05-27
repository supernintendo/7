module Helper {
    export function getNumberOfItemsInCart() {
        if (SHOP) {
            return SHOP.shoppingCart.getTotalNumberOfItems()
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
        SHOP.shoppingCart.hide();
        SHOP.productCategories.forEach(category => category.show());
        SHOP.navButtons.backToShopButton.style.display = 'none';
        SHOP.navButtons.viewCartButton.style.display = '';
    }
    export function navigateToCart() {
        SHOP.shoppingCart.show();
        SHOP.productCategories.forEach(category => category.hide());
        SHOP.navButtons.backToShopButton.style.display = '';
        SHOP.navButtons.viewCartButton.style.display = 'none';
    }
    export function ready(callback: Function) {
        if (document.readyState !== 'loading'){
            callback();
        } else {
            document.addEventListener('DOMContentLoaded', ready.bind(this, callback));
        }
    }
}
