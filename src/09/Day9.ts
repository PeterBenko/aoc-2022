import {Point2d} from './Point2d';

type RLUD = "R" | "L" | "U" | "D";

export class Day9 {
    private readonly movements: Point2d[];

    private readonly movementMap: {[key in RLUD]: Point2d} = {
        R: new Point2d(1, 0),
        L: new Point2d(-1, 0),
        U: new Point2d(0, 1),
        D: new Point2d(0, -1)
    }

    constructor(input: string) {
        this.movements = input.split("\n").map(val => {
            const instruction = val.split(" ");

            const count = +instruction[1];
            const direction = instruction[0] as RLUD;
            const singleMovement = this.movementMap[direction];
            const splitInstructions: Point2d[] = Array(count).fill(singleMovement);
            return splitInstructions;
        }).flat();
    }

    public traceTailMovements(length: number): number {
        type State = {
            chain: Point2d[];
            tTrail: Point2d[];
        };

        const initialState: State = {
            chain: new Array(length).fill(new Point2d(0,0)),
            tTrail: []
        };

        const endState = this.movements.reduce((state, movement) => {
            const newHead = state.chain[0].add(movement);
            const newChain = [newHead];
            for (let index = 1; index < state.chain.length; index++) {
                const link = state.chain[index];
                const newLink = this.calculateTailPosition(link, newChain[index-1]);
                newChain.push(newLink);
            }
            return {
                chain: newChain,
                tTrail: [...state.tTrail, newChain[newChain.length-1]]
            };
        }, initialState);
        const uniquePositions = endState.tTrail.filter((value, index, self) => self.findIndex((p) => p.equals(value) ) === index);
        return uniquePositions.length;
    }

    private calculateTailPosition(tail: Point2d, head: Point2d): Point2d {
        const difference = head.sub(tail);
        if (Math.abs(difference.x) <= 1 && Math.abs(difference.y) <= 1) {
            return tail;
        }

        const cappedX = Math.min(1, Math.max(-1, difference.x));
        const cappedY = Math.min(1, Math.max(-1, difference.y));
        const movement = new Point2d(cappedX, cappedY);
        return tail.add(movement);
    }
}