import * as fs from 'fs';
import {test, describe} from '@jest/globals';
import {Day14} from './Day14';

describe('14', () => {
    describe('*', () => {
        test('should solve the example', () => {
            const input = fs.readFileSync('src/14/example.txt','utf8');
            const challenge = new Day14(input);

            expect(challenge.fill()).toBe(24);
        })
        
        test('should solve challenge', () => {
            const input = fs.readFileSync('src/14/input.txt','utf8');
            const challenge = new Day14(input);

            console.log("Solution *: ", challenge.fill());
        })
    })
    describe('**', () => {
        test('should solve example', () => {
            const input = fs.readFileSync('src/14/example.txt','utf8');
             const challenge = new Day14(input, true);

            expect(challenge.fill()).toBe(93);
        })

        test('should solve challenge', () => {
            const list = fs.readFileSync('src/14/input.txt','utf8');
            const challenge = new Day14(list, true);

            console.log("Solution **: ", challenge.fill());
        })
    })
})
