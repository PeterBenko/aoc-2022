import * as fs from 'fs';
import {test, describe} from '@jest/globals';
import {Day9} from './Day9';

describe('09', () => {
    describe('*', () => {
        test('should solve the example', () => {
            const input = fs.readFileSync('src/09/example.txt','utf8');
            const challenge = new Day9(input);

            expect(challenge.traceTailMovements()).toBe(13);
        })
        
        test('should solve challenge', () => {
            const input = fs.readFileSync('src/09/input.txt','utf8');
            const challenge = new Day9(input);

            console.log("Solution *: ", challenge.traceTailMovements());
        })
    })
    describe('**', () => {
        // test('should solve example', () => {
        //     const input = fs.readFileSync('src/09/example.txt','utf8');
        //     const challenge = new Day9(input);

        //     expect(challenge.getMaxScenicScore()).toBe(9);
        // })

        // test('should solve challenge', () => {
        //     const list = fs.readFileSync('src/09/input.txt','utf8');
        //     const challenge = new Day9(list);

        //     console.log("Solution: ", challenge.getMaxScenicScore());
        // })
    })
})
