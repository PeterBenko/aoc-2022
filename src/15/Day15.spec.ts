import * as fs from 'fs';
import {test, describe} from '@jest/globals';
import {Day15} from './Day15';

describe('15', () => {
    describe('*', () => {
        test('should solve the example', () => {
            const input = fs.readFileSync('src/15/example.txt','utf8');
            const challenge = new Day15(input);

            expect(challenge.scannedAtDepth(10)).toBe(26);
        })
        
        test('should solve challenge', () => {
            const input = fs.readFileSync('src/15/input.txt','utf8');
            const challenge = new Day15(input);

            console.log("Solution *: ", challenge.scannedAtDepth(2000000));
        })
    })
    describe('**', () => {
        test('should solve example', () => {
            const input = fs.readFileSync('src/15/example.txt','utf8');
             const challenge = new Day15(input);

            expect(challenge.findLostSignal(0, 20)).toBe(56000011);
        })

        xtest('should solve challenge', () => {
            const list = fs.readFileSync('src/15/input.txt','utf8');
            const challenge = new Day15(list);

            console.log("Solution **: ", challenge.findLostSignal(0, 4000000));
        })
    })
})
