/// <reference path="../references.ts"/>

module Ajax {
    export class Get {
        request: XMLHttpRequest;

        constructor(url: string, callback: (response: string) => any) {
            this.request = new XMLHttpRequest();
            this.request.onreadystatechange = this.resolveStateChange(callback);
            this.request.open('GET', url, true);
            this.request.send();
        }
        resolveStateChange(callback: (response: string) => any) {
            if (this.request.readyState == 4 && this.request.status == 200) {
                callback(this.request.responseText);
            }
            return null;
        }
    }
}
