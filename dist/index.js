"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Mixin
 *
 * @param {*} behaviour - Mixin object
 * @param {*} sharedBehaviour - Static mixin
 * @returns {Function} - Class decorator
 * @example
 * const Timestamp = mixin({
 *   __timestamp: 0,
 *
 *   init () {
 *     this.__timestamp = Date.now()
 *   },
 *
 *   get timestamp () {
 *     return this.__timestamp
 *   },
 * })
 *
 * \@Timestamp
 * class User {
 *   __firstName = ''
 *   __secondName = ''
 *
 *   constructor (firstName, secondName) {
 *     this.__firstName = firstName
 *     this.__secondName = secondName
 *     this.init()
 *   }
 *
 *   get fullName () {
 *     return `${this.__firstName} ${this.__secondName}`
 *   }
 * }
 *
 * const user = new User('John', 'Doe')
 * console.log(user.timestamp) // current time
 * console.log(user.fullName) // John Doe
 */
function mixin(behaviour, sharedBehaviour = {}) {
    const typeTag = Symbol('isa');
    // if (typeof behaviour === 'function') {
    //   behaviour = (<ObjectConstructor>behaviour).prototype // TODO: type safe
    // }
    /**
     * @param {Function} clazz
     */
    function _mixin(clazz) {
        Object.getOwnPropertyNames(behaviour).forEach(property => {
            const propDescr = Object.getOwnPropertyDescriptor(behaviour, property);
            if (typeof propDescr.value === 'function') {
                const mixinKey = `__mixin_${property}`;
                if (!clazz.prototype[mixinKey]) {
                    clazz.prototype[mixinKey] = [];
                    clazz.prototype[property] && clazz.prototype[mixinKey].push(clazz.prototype[property]);
                }
                clazz.prototype[mixinKey].push(behaviour[property]);
                clazz.prototype[property] = function (...args) {
                    if (clazz.prototype[mixinKey].length === 1) {
                        return clazz.prototype[mixinKey][0].apply(this, args);
                    }
                    for (const fn of clazz.prototype[mixinKey]) {
                        if (fn.apply(this, args) !== undefined) {
                            throw new Error('A mixed in method returned a value when undefined was expected.');
                        }
                    }
                };
            }
            else {
                Object.defineProperty(clazz.prototype, property, propDescr);
            }
        });
        Object.defineProperty(clazz.prototype, typeTag, { value: true });
        return clazz;
    }
    Object.getOwnPropertyNames(sharedBehaviour).forEach(property => {
        const descriptor = Object.getOwnPropertyDescriptor(sharedBehaviour, property);
        descriptor && Object.defineProperty(_mixin, property, descriptor);
    });
    Object.defineProperty(_mixin, Symbol.hasInstance, {
        value: (i) => !!i[typeTag]
    });
    return _mixin;
}
exports.default = mixin;
//# sourceMappingURL=index.js.map