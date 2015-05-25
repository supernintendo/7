/// <reference path="../references.ts"/>

module Ajax {
    export class Get {
        constructor(url: string, callback: (response: string) => any) {
            var request: XMLHttpRequest = new XMLHttpRequest();

            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    callback(JSON.parse(request.responseText));
                }
            }
            request.open('GET', 'json/' + url, true);
            request.send();
        }
    }
}
