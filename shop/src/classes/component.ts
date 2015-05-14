module Component {
    export interface Params {
        source: string;
        target: string;
    }
    export class View {
        source: HTMLScriptElement;
        target: HTMLScriptElement;

        constructor(params: Params) {
            this.source = <HTMLScriptElement>document.querySelector(params.source);
            this.target = <HTMLScriptElement>document.querySelector(params.target);
            this.render();
        }
        render() {
            this.target.innerHTML = this.source.innerHTML;
        }
    }
}
