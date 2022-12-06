import * as fs from 'fs';
import {test, describe} from '@jest/globals';
import {Day6} from './Day6';

describe('06', () => {
    describe('*', () => {
        test('should solve example 1', () => {
            const input = "bvwbjplbgvbhsrlpgdmjqwftvncz";
            const challenge = new Day6(input);

            expect(challenge.findStartOfPacketMarker()).toBe(5);
        })
        test('should solve example 2', () => {
            const input = "nppdvjthqldpwncqszvftbrmjlhg";
            const challenge = new Day6(input);

            expect(challenge.findStartOfPacketMarker()).toBe(6);
        })
        test('should solve example 3', () => {
            const input = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg";
            const challenge = new Day6(input);

            expect(challenge.findStartOfPacketMarker()).toBe(10);
        })
        test('should solve example 4', () => {
            const input = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw";
            const challenge = new Day6(input);

            expect(challenge.findStartOfPacketMarker()).toBe(11);
        })
        
        test('should solve challenge', () => {
            const input = fs.readFileSync('src/06/input.txt','utf8');
            const challenge = new Day6(input);

            console.log(challenge.findStartOfPacketMarker());
        })
    })
    describe('**', () => {
        test('should solve example 1', () => {
            const input = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";
            const challenge = new Day6(input);

            expect(challenge.findStartOfMessageMarker()).toBe(19);
        })

        test('should solve example 2', () => {
            const input = "bvwbjplbgvbhsrlpgdmjqwftvncz";
            const challenge = new Day6(input);

            expect(challenge.findStartOfMessageMarker()).toBe(23);
        })

        test('should solve example 3', () => {
            const input = "nppdvjthqldpwncqszvftbrmjlhg";
            const challenge = new Day6(input);

            expect(challenge.findStartOfMessageMarker()).toBe(23);
        })

        test('should solve example 4', () => {
            const input = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg";
            const challenge = new Day6(input);

            expect(challenge.findStartOfMessageMarker()).toBe(29);
        })

        test('should solve example 4', () => {
            const input = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw";
            const challenge = new Day6(input);

            expect(challenge.findStartOfMessageMarker()).toBe(26);
        })

        test('should solve challenge', () => {
            const list = fs.readFileSync('src/06/input.txt','utf8');
            const challenge = new Day6(list);

            console.log(challenge.findStartOfMessageMarker());
        })
    })
})
