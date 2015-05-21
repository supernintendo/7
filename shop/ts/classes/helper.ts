module Helper {
    export function generateArray(n: number, func: Function) {
        return Array.apply(null, Array(n)).map(func);
    }
    export function selector(root: any, selector: string) {
        return <HTMLScriptElement>root.querySelector(selector);
    }
    export function navigateToShop() {
        Shop.shoppingCart.hide();
        Shop.productList.show();
        Shop.navButtons.backToShopButton.style.display = 'none';
        Shop.navButtons.viewCartButton.style.display = '';
    }
    export function navigateToCart() {
        Shop.shoppingCart.show();
        Shop.productList.hide();
        Shop.navButtons.backToShopButton.style.display = '';
        Shop.navButtons.viewCartButton.style.display = 'none';
    }
}