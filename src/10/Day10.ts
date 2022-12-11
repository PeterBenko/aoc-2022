export class Day10 {
    // [y][x]
    private readonly input: string[];

    constructor(input: string) {
        this.input = input.split("\n");
    }

    public calculateStignalStrengths(): number {
        const regDiff = this.input.flatMap(val => {
            if (val === "noop") {
                return [0]
            }

            return [0, +val.split(" ")[1]];
        });

        return regDiff.reduce((acc, val, currCycle) => {
            const cycleNumber = currCycle + 1;
            if ((cycleNumber - 20) % 40 === 0) {
                acc.signalStrength += cycleNumber * acc.reg;
            }
            acc.reg += val;
            return acc;
        }, {reg: 1, signalStrength: 0}).signalStrength
    }

    public drawCRT(): string {
        const output = this.input.flatMap(val => {
            if (val === "noop") {
                return [0]
            }

            return [0, +val.split(" ")[1]];
        }).reduce(
            (acc, val, ) => {
                acc.states.push({
                    reg: acc.reg
                })
                acc.reg += val;
                return acc;
            }, 
            {reg: 1, states: []} as {reg: number, states: {reg: number}[]}
        )
        .states
        .reduce((acc, val, currCycle) => {
            const pos = currCycle % 40;
            if (currCycle % 40 === 0) {
                acc += "\n";
            }
            const diff = Math.abs(pos - val.reg);
            if (diff <= 1){
                acc += "#";
            } else {
                acc += "."
            }
            return acc;
        }, "" as string)
        
        return output;
    }
}