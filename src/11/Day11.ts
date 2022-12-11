import { Monkey } from "./Monkey"
import { MonkeyFactory } from "./MonkeyFactory";

export class Day11 {
    private readonly monkeys: Monkey[];

    constructor(input: string) {
        this.monkeys = input.split("\n\n").map(monkeyLines => MonkeyFactory.createFromInput(monkeyLines));
    }

    public getLevelOfMonkeyBusinessWithRelief(rounds: number = 20): number {
        const reliefManagement = (itemWorry: number): number => {
            const relievedWorry = Math.floor(itemWorry / 3);
            const jointModulo = this.monkeys.reduce((acc, monkey) => acc * monkey.testDivisor, 1);
            const cappedRelief = relievedWorry % jointModulo;
            return cappedRelief;
        }
        for (const round of new Array(rounds)) {
            for (const monkey of this.monkeys) {
                monkey.throwAll(this.monkeys, reliefManagement);
            }
        }

        const monkeyBusinesses = this.monkeys.map(monkey => monkey.getInspectCount()).sort((a, b) => b - a);
        return monkeyBusinesses[0] * monkeyBusinesses[1];
    }

    public getLevelOfMonkeyBusinessNoRelief(rounds: number = 20): number {
        const reliefManagement = (itemWorry: number): number => {
            const jointModulo = this.monkeys.reduce((acc, monkey) => acc * monkey.testDivisor, 1);
            const cappedRelief = itemWorry % jointModulo;
            return cappedRelief;
        }

        for (const round of new Array(rounds)) {
            for (const monkey of this.monkeys) {
                monkey.throwAll(this.monkeys, reliefManagement);
            }
        }

        const monkeyBusinesses = this.monkeys.map(monkey => monkey.getInspectCount()).sort((a, b) => b - a);
        return monkeyBusinesses[0] * monkeyBusinesses[1];
    }
}