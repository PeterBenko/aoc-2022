import * as fs from 'fs';
import {test, describe} from '@jest/globals';
import {Day3} from './Day3';

describe('03', () => {
    describe('*', () => {
        test('should find correct duplicates', () => {
            const input = fs.readFileSync('src/03/example.txt','utf8');
            const challenge = new Day3(input);

            expect(challenge.findDuplicatesInRucksacks()).toBe("pLPvts");
        })

        test('should calculate correct priorities of single items', () => {
            const input = fs.readFileSync('src/03/example.txt','utf8');
            const challenge = new Day3(input);

            expect(challenge.getPriority('a')).toBe(1);
            expect(challenge.getPriority('A')).toBe(27);
            expect(challenge.getPriority('Z')).toBe(52);
        })

        test('should calculate correct duplicate priorities', () => {
            const input = fs.readFileSync('src/03/example.txt','utf8');
            const challenge = new Day3(input);

            expect(challenge.sumPrioritiesOfDuplicates()).toBe(157);
        })

        
        test('should solve challenge', () => {
            const input = fs.readFileSync('src/03/input.txt','utf8');
            const challenge = new Day3(input);

            console.log(challenge.sumPrioritiesOfDuplicates());
        })
    })
    describe('**', () => {
        test('should solve example', () => {
            const input = fs.readFileSync('src/03/example.txt','utf8');
            const challenge = new Day3(input);

            // expect(challenge.calculateScorePart2()).toBe(12);
        })
        test('should solve challenge', () => {
            const list = fs.readFileSync('src/03/input.txt','utf8');
            const challenge = new Day3(list);

            // console.log(challenge.calculateScorePart2());
        })
    })
})
