import * as fs from 'fs';
import {test, describe} from '@jest/globals';
import {Day2} from './Day2';

describe('02', () => {
    describe('*', () => {
        test('should solve example', () => {
            const input = fs.readFileSync('src/02/example.txt','utf8');
            const challenge = new Day2(input);

            expect(challenge.calculateScorePart1()).toBe(15);
        })
        test('should solve challenge', () => {
            const input = fs.readFileSync('src/02/input.txt','utf8');
            const challenge = new Day2(input);

            const result = challenge.calculateScorePart1();
            console.log(result)
        })
    })
    describe('**', () => {
        test('should solve example', () => {
            const input = fs.readFileSync('src/02/example.txt','utf8');
            const challenge = new Day2(input);

            expect(challenge.calculateScorePart2()).toBe(12);
        })
        test('should solve challenge', () => {
            const list = fs.readFileSync('src/02/input.txt','utf8');
            const challenge = new Day2(list);

            console.log(challenge.calculateScorePart2());
        })
    })
})
