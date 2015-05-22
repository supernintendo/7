module Spec {
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
    export interface Component {
        attributes: any;
        source: string;
        target: string;
    }
}
