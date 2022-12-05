import * as fs from 'fs';
import {test, describe} from '@jest/globals';
import {Day4} from './Day4';

describe('04', () => {
    describe('*', () => {
        test('should find correct duplicates', () => {
            const input = fs.readFileSync('src/04/example.txt','utf8');
            const challenge = new Day4(input);

            expect(challenge.countFullyContainedAssignments()).toBe(2);
        })
        
        test('should solve challenge', () => {
            const input = fs.readFileSync('src/04/input.txt','utf8');
            const challenge = new Day4(input);

            console.log(challenge.countFullyContainedAssignments());
        })
    })
    describe('**', () => {
        test('should solve example', () => {
            const input = fs.readFileSync('src/04/example.txt','utf8');
            const challenge = new Day4(input);

            expect(challenge.countOverlapping()).toBe(4);
        })

        test('should solve challenge', () => {
            const list = fs.readFileSync('src/04/input.txt','utf8');
            const challenge = new Day4(list);

            console.log(challenge.countOverlapping());
        })
    })
})
