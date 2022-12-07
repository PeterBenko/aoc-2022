import * as fs from 'fs';
import {test, describe} from '@jest/globals';
import {Day7} from './Day7';

describe('07', () => {
    describe('*', () => {
        test('should solve the example', () => {
            const input = fs.readFileSync('src/07/example.txt','utf8');
            const challenge = new Day7(input);

            expect(challenge.findFoldersBelow(100000)).toBe(95437);
        })
        
        test('should solve challenge', () => {
            const input = fs.readFileSync('src/07/input.txt','utf8');
            const challenge = new Day7(input);

            console.log("Solution: ", challenge.findFoldersBelow(100000));
        })
    })
    describe('**', () => {
        test('should solve example', () => {
            const input = fs.readFileSync('src/07/example.txt','utf8');
            const challenge = new Day7(input);

            expect(challenge.getSmallestFolderForEnoughSpace()).toBe(24933642);
        })

        test('should solve challenge', () => {
            const list = fs.readFileSync('src/07/input.txt','utf8');
            const challenge = new Day7(list);

            console.log("Solution: ", challenge.getSmallestFolderForEnoughSpace());
        })
    })
})
