module Spec {
    export interface CartItem {
        product: Product;
        quantity: number;
    }
    export interface Component {
        attributes: any;
        source: string;
        target: string;
    }
    export interface Product {
        description: string;
        id: number;
        image: string;
        name: string;
        price: number;
    }
    export interface ProductCategory {
        title: string;
    }
    export interface ShoppingCart {
        items: Array<CartItem>;
        subtotal: Function;
    }
}
