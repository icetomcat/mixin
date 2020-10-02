import mixin from '../src'
import { expect } from 'chai';
describe("mixin", () => {
  it("should be mixed", () => {
    const time = Date.now()
    const Timestamp = mixin({
      __timestamp: 0,
      init () {
        this.__timestamp = time
      },
      get timestamp () {
        return this.__timestamp
      },
    })

    @Timestamp
    class User {
      [x: string]: any;
      __firstName = ''
      __secondName = ''
      constructor (firstName: string, secondName: string) {
        this.__firstName = firstName
        this.__secondName = secondName
        this.init()
      }
      get fullName () {
        return `${this.__firstName} ${this.__secondName}`
      }
    }

    const user = new User('John', 'Doe')
    
    expect(user.fullName).equal('John Doe')
    expect(user.timestamp).equal(time)
  });
});