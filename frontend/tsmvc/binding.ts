"use strict";
export default function(someClass) {
    for (const key of Object.getOwnPropertyNames(someClass.constructor.prototype)) {
        if ( typeof someClass[key] === "function" ) {
            someClass[key] = someClass[key].bind(someClass);
        }
    }
    return someClass;
}
