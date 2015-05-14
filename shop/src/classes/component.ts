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
            var container: Element;
            var subComponents: Element;

            this.target.innerHTML = this.source.outerHTML;
            container = <HTMLScriptElement>this.target.children[0];
            subComponents = container.querySelector('[data-component]');

            if (subComponents) {
                subComponents.remove();
            }
            container.classList.remove('hide');
        }
    }
}
