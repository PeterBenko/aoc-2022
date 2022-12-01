import {expect, test, describe} from '@jest/globals';
import {Foo} from './foo';

describe('Foo', () => {
    test('should return bar', () => {
        const foo = new Foo();
        expect(foo.getBar()).toBe('bar')
    })

    test('should not return foo', () => {
        const foo = new Foo();
        expect(foo.getBar()).not.toBe('foo')
    })
})
