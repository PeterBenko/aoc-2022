import * as fs from 'fs';
import {test, describe} from '@jest/globals';
import {Day12} from './Day12';

describe('12', () => {
    describe('*', () => {
        test('should solve the example', () => {
            const input = fs.readFileSync('src/12/example.txt','utf8');
            const challenge = new Day12(input);

            expect(challenge.findPath()).toBe(31);
        })
        
        test('should solve challenge', () => {
            const input = fs.readFileSync('src/12/input.txt','utf8');
            const challenge = new Day12(input);

            console.log("Solution *: ", challenge.findPath());
        })
    })
    describe('**', () => {
        test('should solve example', () => {
            const input = fs.readFileSync('src/12/example.txt','utf8');
             const challenge = new Day12(input);

            expect(challenge.findScenicPath()).toBe(29);
        })

        test('should solve challenge', () => {
            const list = fs.readFileSync('src/12/input.txt','utf8');
            const challenge = new Day12(list);

            console.log("Solution **: ", challenge.findScenicPath());
        })
    })
})
