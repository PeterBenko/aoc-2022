import * as fs from 'fs';
import {test, describe} from '@jest/globals';
import {Day5} from './Day5';

describe('05', () => {
    describe('*', () => {
        test('should find correct duplicates', () => {
            const input = fs.readFileSync('src/05/example.txt','utf8');
            const challenge = new Day5(input);

            expect(challenge.runCrane()).toBe("CMZ");
        })
        
        test('should solve challenge', () => {
            const input = fs.readFileSync('src/05/input.txt','utf8');
            const challenge = new Day5(input);

            console.log(challenge.runCrane());
        })
    })
    describe('**', () => {
        test('should solve example', () => {
            const input = fs.readFileSync('src/05/example.txt','utf8');
            const challenge = new Day5(input);

            expect(challenge.runCrane9001()).toBe("MCD");
        })

        test('should solve challenge', () => {
            const list = fs.readFileSync('src/05/input.txt','utf8');
            const challenge = new Day5(list);

            console.log(challenge.runCrane9001());
        })
    })
})
