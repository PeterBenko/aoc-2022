export class Day2 {

    private rounds: [string, string][];

    // Rock Paper Scissors
    // A    B     C
    // X    Y     Z
    private scoreMap:{ [name: string]: { [name: string]: number } } = {
        A: {
            X: 3,
            Y: 6,
            Z: 0,
            A: 3,
            B: 6,
            C: 0           
        },
        B: {
            X: 0,
            Y: 3,
            Z: 6,
            A: 0,
            B: 3,
            C: 6
        },
        C: {
            X: 6,
            Y: 0,
            Z: 3,
            A: 6,
            B: 0,
            C: 3
        }
    };

    private matchMap: { [name: string]: { [name: string]: string } } = {
        A: {
            X: "C",
            Y: "A",
            Z: "B"        
        },
        B: {
            X: "A",
            Y: "B",
            Z: "C"
        },
        C: {
            X: "B",
            Y: "C",
            Z: "A"
        }
    }

    private scoreThrown: { [name: string]: number } = {
        X: 1,
        Y: 2,
        Z: 3,
        A: 1,
        B: 2,
        C: 3
    };

    constructor(list: string) {
        this.rounds = list.split("\n").map(round => round.split(" ") as [string, string]);
    }

    public calculateScorePart1(): number {
        return this.rounds.reduce((acc, val) => {
            return acc + this.scoreMatch(val) + this.scoreThrown[val[1]];
        }, 0);
    }
    
    public calculateScorePart2(): number {
        return this.rounds.reduce((acc, val) => {
            const ownSign = this.matchMap[val[0]][val[1]];
            return acc + this.scoreMatch([val[0], ownSign]) + this.scoreThrown[ownSign];
        }, 0);
    }

    private scoreMatch(match: [string, string]): number {
        return this.scoreMap[match[0]][match[1]]
    }
}