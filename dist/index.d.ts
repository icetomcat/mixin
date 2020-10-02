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
declare function mixin<T extends Record<string, unknown>>(behaviour: T, sharedBehaviour?: {}): <TClass extends {
    new (...args: any[]): {};
}>(target: TClass) => TClass | void;
export default mixin;
