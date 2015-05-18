/// <reference path="../references.ts"/>

module Component {
    export class View {
        attributes: any;
        source: HTMLScriptElement;
        target: HTMLScriptElement;

        constructor(params: Spec.Component) {
            this.attributes = params.attributes;
            this.source = <HTMLScriptElement>document.querySelector(params.source);
            this.target = <HTMLScriptElement>document.querySelector(params.target);
            this.render();
        }
        fillTemplate(el: HTMLScriptElement) {
            if (el.dataset && el.dataset['template'] && this.attributes[el.dataset['template']]) {
                el.innerHTML = this.attributes[el.dataset['template']];
            }
        }
        fillTemplates(container: Element) {
            var i: number,
                el: HTMLScriptElement,
                templates: NodeList = container.querySelectorAll('[data-template]');

            for (i = 0; i < templates.length; i++) {
                this.fillTemplate(<HTMLScriptElement>templates[i]);
            }
        }
        removeSubComponents(container: Element) {
            var subComponents: Element = container.querySelector('[data-component]');

            if (subComponents) {
                subComponents.remove();
            }
        }
        render() {
            var container: HTMLScriptElement;

            this.target.innerHTML = this.source.outerHTML;

            container = <HTMLScriptElement>this.target.children[0];
            this.removeSubComponents(container);
            this.fillTemplates(container);
            delete container.dataset['component'];
        }
    }
}
