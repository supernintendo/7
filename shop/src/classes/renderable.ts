module Renderable {
    export class Content {
        content: string;
        outlet: string;

        constructor(outlet: string) {
            this.render();
        }
        render() {
            console.log('todo');
        }
    }
}
