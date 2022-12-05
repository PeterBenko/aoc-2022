
export class Day5 {

    private stacks: string[][] = [];
    private instructions: {from: number, to: number, count: number}[] = [];

    constructor(input: string) {
        const [rawStatus, rawInstructions] = input.split("\n\n");

        const instructions = input.matchAll(/move (\d+) from (\d+) to (\d+)/g);
        for (const [full, count, from, to] of instructions) {
            this.instructions.push({from: +from - 1, to: +to - 1, count: +count});
        }

        let rawStacks = input.replace(/[ ]{4}/g, " [ ] ").replaceAll(" [", "[").replaceAll("] ", "]");
        const matches = rawStacks.matchAll(/(\[.\])+/gi)
        for (const line of Array.from(matches).reverse()) {
            const match = line[0].matchAll(/(\[.\])/gi);
            for (const [index, containerMatches] of Array.from(match).entries()) {
                const container = containerMatches[1];

                if (container === "[ ]"){
                    continue;
                }

                if (!this.stacks[index]) {
                    this.stacks[index] = [];
                }
                this.stacks[index].push(container.replaceAll(/\[|\]/g, ""));
            }
            
        }
    }

    public runCrane(){
        const endStacks = this.instructions
            .reduce((stacks, instruction) => {
                for (const i of Array(instruction.count)) {
                    const container = stacks[instruction.from].pop()!;
                    stacks[instruction.to].push(container);
                }
                return stacks;
            }, this.stacks);
        return endStacks.reduce((result, stack) => {
            return result + stack.pop();
        }, "")
    }

    public runCrane9001(){
        const endStacks = this.instructions
            .reduce((stacks, instruction) => {                
                const containers = stacks[instruction.from].splice(-instruction.count);
                stacks[instruction.to].push(...containers);
                return stacks;
            }, this.stacks);
        return endStacks.reduce((result, stack) => {
            return result + stack.pop();
        }, "")
    }
}