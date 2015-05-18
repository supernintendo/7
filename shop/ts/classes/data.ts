/// <reference path="../references.ts"/>

module Data {
    export class Products {
        items: Array<Spec.Product>

        constructor(set: string) {
            switch(set) {
                case 'test':
                    this.items = [
                        <Spec.Product>{
                            description: "Lorem Ipsum",
                            image: "foo",
                            name: "foo",
                            price: 19.99
                        }
                    ]
                    break;
                default:
                    this.items = [];
                    break;;
            }
        }
    }
}
