export default class {
    private events: object;
    constructor() {
        this.events = {};
    }

    public emit(eventName: string, data: any) {
        const event = this.events[eventName];
        if ( event ) {
            event.forEach( (fn) => {
                fn.call(null, data);
            });
        }
    }
    public subscribe(eventName: string, fn) {
        if (!this.events[eventName]) {
        this.events[eventName] = [];
        }
        this.events[eventName].push(fn);
        return () => {
            this.events[eventName] = this.events[eventName].filter((eventFn) => fn !== eventFn);
        };
    }
}
