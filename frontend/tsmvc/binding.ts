'use strict';
export default function(currentClass) {
  for (const key of Object.getOwnPropertyNames(currentClass.constructor.prototype)) {
    if (typeof currentClass[key] === 'function') {
      currentClass[key] = currentClass[key].bind(currentClass);
    }
  }
  return currentClass;
}
