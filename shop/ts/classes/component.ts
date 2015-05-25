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
            return null;
        }
        fetchRemote() {
            if (this.attributes && this.attributes.remote) {
                new Ajax.Get(this.attributes.remote, this.ajaxResponse.bind(this));
            }
        }
        fillTemplate(el: HTMLScriptElement) {
            var key: string = el.dataset['template'],
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
            var i: number,
                el: HTMLScriptElement,
                templates: NodeList = container.querySelectorAll('[data-template]');

            // No .forEach on a NodeList. :(
            for (i = 0; i < templates.length; i++) {
                this.fillTemplate(<HTMLScriptElement>templates[i]);
            }
        }
        hide() {
            this.target.style.display = 'none';
        }
        insertValues(container: Element) {
            var i: number,
                el: HTMLScriptElement,
                nodes: NodeList = container.querySelectorAll('[data-replace]'),
                parts: Array<string>;

            for (i = 0; i < nodes.length; i++) {
                el = <HTMLScriptElement>nodes[i]; // Cast each Node to an HTMLScriptElement.
                parts = el.dataset['replace'].split(':');

                if (this.attributes[parts[1]]) {
                    el.setAttribute(parts[0], this.attributes[parts[1]]);
                }
            }
        }
        placeViews(prefix: string, value: any, index: number) {
            return `<div data-view="${prefix}${index}"></div>`;
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
            var target: HTMLScriptElement = this.target;

            target.style.display = '';

            // Fade the element in.
            target.style.opacity = '0';
            setTimeout(function() {
                target.style.opacity = '1';
            }, 1);
        }
    }
}
