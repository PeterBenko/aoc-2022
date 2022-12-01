import * as fs from 'fs';
import {test, describe} from '@jest/globals';
import {Day1} from './Day1';

describe('01', () => {
    describe('1', () => {
        test('should solve example', () => {
            const list = fs.readFileSync('src/01/example.txt','utf8');
            const foo = new Day1(list);
            expect(foo.mostCaloriesCarried()).toBe(24000);
        })
        test('should solve challenge', () => {
            const list = fs.readFileSync('src/01/input.txt','utf8');
            const foo = new Day1(list);

            const result = foo.mostCaloriesCarried();
            expect(foo.mostCaloriesCarried()).toBe(69883);
        })
    })
})
