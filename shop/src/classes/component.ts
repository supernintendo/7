/// <reference path="../references.ts"/>

module Component {
    export interface Params {
        attributes: any;
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
        fillTemplates(container: Element) {
            var templates: Element = container.querySelector('[data-template]');

            console.log(templates);
        }
        removeSubComponents(container: Element) {
            var subComponents: Element = container.querySelector('[data-component]');

            if (subComponents) {
                subComponents.remove();
            }
        }
        render() {
            var container: Element;

            this.target.innerHTML = this.source.outerHTML;
            container = <HTMLScriptElement>this.target.children[0];
            this.removeSubComponents(container);
            this.fillTemplates(container);
            container.classList.remove('hide');
        }
    }
}
