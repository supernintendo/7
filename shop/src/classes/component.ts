/// <reference path="../references.ts"/>

module Component {
    export class View {
        attributes: any;
        source: HTMLScriptElement;
        target: HTMLScriptElement;

        constructor(params: Spec.Component) {
            this.attributes = params.attributes;
            this.setSource(params.source);
            this.setTarget(params.target);
        }
        ajaxResponse(response: any) {
            return response;
        }
        fetchRemote() {
            if (this.attributes && this.attributes.remote) {
                new Ajax.Get(this.attributes.remote, this.ajaxResponse.bind(this));
            }
        }
        fillTemplate(el: HTMLScriptElement) {
            let key: string = el.dataset['template'],
                attribute: any = this.attributes[key];

            if (attribute) {
                if (typeof attribute === 'function') {
                    el.innerHTML = attribute();
                } else {
                    el.innerHTML = attribute;
                }
            }
        }
        fillTemplates(container: Element) {
            let i: number,
                templates: NodeList = container.querySelectorAll('[data-template]');

            // No .forEach on a NodeList. :(
            for (i = 0; i < templates.length; i++) {
                this.fillTemplate(<HTMLScriptElement>templates[i]);
            }
        }
        getContainer() {
            return <HTMLScriptElement>this.target.children[0];
        }
        hide() {
            this.target.style.display = 'none';
        }
        insertValues(container: Element) {
            let i: number,
                nodes: NodeList = container.querySelectorAll('[data-replace]');

            for (i = 0; i < nodes.length; i++) {
                let el: HTMLScriptElement = <HTMLScriptElement>nodes[i], // Cast each Node to an HTMLScriptElement.
                    parts: Array<string> = el.dataset['replace'].split(':');

                if (this.attributes[parts[1]]) {
                    el.setAttribute(parts[0], this.attributes[parts[1]]);
                }
            }
        }
        placeViews(prefix: string, tag: string, value: any, index: number) {
            return `<${tag} data-view="${prefix}${index}"></${tag}>`;
        }
        removeSubComponents(container: Element) {
            let subComponents: Element = container.querySelector('[data-component]');

            if (subComponents) {
                subComponents.remove();
            }
        }
        render() {
            this.renderContent();
        }
        renderContent() {
            this.target.innerHTML = this.source.outerHTML;

            let container: HTMLScriptElement = this.getContainer();
            this.removeSubComponents(container);
            this.fillTemplates(container);
            this.insertValues(container);

            delete container.dataset['component'];
        }
        setSource(source: string) {
            this.source = Helper.selector(document, source);
        }
        setTarget(target: string) {
            this.target = Helper.selector(document, target);
        }
        show() {
            let target: HTMLScriptElement = this.target;

            target.style.display = '';

            // Fade the element in.
            target.style.opacity = '0';
            setTimeout(() => {
                target.style.opacity = '1';
            }, 1);
        }
    }
}
