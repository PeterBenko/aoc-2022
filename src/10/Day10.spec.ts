import * as fs from 'fs';
import {test, describe} from '@jest/globals';
import {Day10} from './Day10';

describe('10', () => {
    describe('*', () => {
        test('should solve the example', () => {
            const input = fs.readFileSync('src/10/example.txt','utf8');
            const challenge = new Day10(input);

            expect(challenge.calculateStignalStrengths()).toBe(13140);
        })
        
        test('should solve challenge', () => {
            const input = fs.readFileSync('src/10/input.txt','utf8');
            const challenge = new Day10(input);

            console.log("Solution *: ", challenge.calculateStignalStrengths());
        })
    })
    describe('**', () => {
        test('should solve example', () => {
            const input = fs.readFileSync('src/10/example.txt','utf8');
             const challenge = new Day10(input);

            expect(challenge.drawCRT()).toBe(`
##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`);
        })

        test('should solve challenge', () => {
            const list = fs.readFileSync('src/10/input.txt','utf8');
            const challenge = new Day10(list);

            console.log("Solution: ", challenge.drawCRT());
        })
    })
})
