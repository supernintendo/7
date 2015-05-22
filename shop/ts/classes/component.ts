/// <reference path="../references.ts"/>

module Component {
    export class View {
        attributes: any;
        source: HTMLScriptElement;
        target: HTMLScriptElement;

        ajaxResponse(response: any) {
            return null;
        }
        constructor(params: Spec.Component) {
            this.attributes = params.attributes;
            this.setSource(params.source);
            this.setTarget(params.target);
        }
        fetchRemote() {
            if (this.attributes && this.attributes.remote) {
                new Ajax.Get(this.attributes.remote, this.ajaxResponse.bind(this));
            }
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
        hide() {
            this.target.style.display = 'none';
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
            target.style.opacity = '0';
            setTimeout(function() {
                target.style.opacity = '1';
            }, 100);
        }
    }
}
