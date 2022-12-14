import * as fs from 'fs';
import {test, describe} from '@jest/globals';
import {Day13} from './Day13';

describe('13', () => {
    describe('*', () => {
        test('should solve the example', () => {
            const input = fs.readFileSync('src/13/example.txt','utf8');
            const challenge = new Day13(input);

            expect(challenge.sumInRightOrder()).toBe(13);
        })
        
        test('should solve challenge', () => {
            const input = fs.readFileSync('src/13/input.txt','utf8');
            const challenge = new Day13(input);

            console.log("Solution *: ", challenge.sumInRightOrder());
        })
    })
    describe('**', () => {
        test('should solve example', () => {
            const input = fs.readFileSync('src/13/example.txt','utf8');
             const challenge = new Day13(input);

            expect(challenge.multDividerPositions()).toBe(140);
        })

        test('should solve challenge', () => {
            const list = fs.readFileSync('src/13/input.txt','utf8');
            const challenge = new Day13(list);

            console.log("Solution **: ", challenge.multDividerPositions());
        })
    })
})
