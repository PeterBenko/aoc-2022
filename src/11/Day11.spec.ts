import * as fs from 'fs';
import {test, describe} from '@jest/globals';
import {Day11} from './Day11';

describe('11', () => {
    describe('*', () => {
        test('should solve the example', () => {
            const input = fs.readFileSync('src/11/example.txt','utf8');
            const challenge = new Day11(input);

            expect(challenge.getLevelOfMonkeyBusinessWithRelief()).toBe(10605);
        })
        
        test('should solve challenge', () => {
            const input = fs.readFileSync('src/11/input.txt','utf8');
            const challenge = new Day11(input);

            console.log("Solution *: ", challenge.getLevelOfMonkeyBusinessWithRelief());
        })
    })
    describe('**', () => {
        test('should solve example', () => {
            const input = fs.readFileSync('src/11/example.txt','utf8');
             const challenge = new Day11(input);

            expect(challenge.getLevelOfMonkeyBusinessNoRelief(10000)).toBe(2713310158);
        })

        test('should solve challenge', () => {
            const list = fs.readFileSync('src/11/input.txt','utf8');
            const challenge = new Day11(list);

            console.log("Solution **: ", challenge.getLevelOfMonkeyBusinessNoRelief(10000));
        })
    })
})
