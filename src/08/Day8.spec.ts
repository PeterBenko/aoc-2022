import * as fs from 'fs';
import {test, describe} from '@jest/globals';
import {Day8} from './Day8';

describe('08', () => {
    describe('*', () => {
        test('should solve the example', () => {
            const input = fs.readFileSync('src/08/example.txt','utf8');
            const challenge = new Day8(input);

            expect(challenge.countVisibleTrees()).toBe(21);
        })
        
        test('should solve challenge', () => {
            const input = fs.readFileSync('src/08/input.txt','utf8');
            const challenge = new Day8(input);

            console.log("Solution: ", challenge.countVisibleTrees());
        })
    })
    describe('**', () => {
        test('should solve example', () => {
            const input = fs.readFileSync('src/08/example.txt','utf8');
            const challenge = new Day8(input);

            expect(challenge.getMaxScenicScore()).toBe(8);
        })

        test('should solve example 1 2', () => {
            const input = fs.readFileSync('src/08/example.txt','utf8');
            const challenge = new Day8(input);

            expect(challenge.getScenicScore(1, 2)).toBe(4);
        })

        test('should solve example 1 1', () => {
            const input = fs.readFileSync('src/08/example.txt','utf8');
            const challenge = new Day8(input);

            expect(challenge.getScenicScore(1, 1)).toBe(1);
        })

        test('should solve example 0 2', () => {
            const input = fs.readFileSync('src/08/example.txt','utf8');
            const challenge = new Day8(input);

            expect(challenge.getScenicScore(0, 2)).toBe(0);
        })

        test('should solve example 2 0', () => {
            const input = fs.readFileSync('src/08/example.txt','utf8');
            const challenge = new Day8(input);

            expect(challenge.getScenicScore(2, 0)).toBe(0);
        })

        test('should solve example 3 4', () => {
            const input = fs.readFileSync('src/08/example.txt','utf8');
            const challenge = new Day8(input);

            expect(challenge.getScenicScore(3, 4)).toBe(0);
        })

        test('should solve example 3 2', () => {
            const input = fs.readFileSync('src/08/example.txt','utf8');
            const challenge = new Day8(input);

            expect(challenge.getScenicScore(3, 2)).toBe(8);
        })

        test('should solve challenge', () => {
            const list = fs.readFileSync('src/08/input.txt','utf8');
            const challenge = new Day8(list);

            console.log("Solution: ", challenge.getMaxScenicScore());
        })
    })
})
