module Helper {
    export function generateArray(n: number, func: Function) {
        return Array.apply(null, Array(n)).map(func);
    }
    export function selector(root: any, selector: string) {
        return <HTMLScriptElement>root.querySelector(selector);
    }
}
