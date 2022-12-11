import {Monkey} from "./Monkey";

export class MonkeyFactory {
    public static createFromInput(monkeyLines: string): Monkey {
        const items = Array.from(monkeyLines.matchAll(/Starting items: (.+)/gm))[0][1].split(", ")
                                 .map(s => +s);
        const inspectionTokens = Array.from(monkeyLines.matchAll(/Operation: new = (.+)/gm))[0][1]
                                     .split(" ");
        const inspectionWorry = this.createInspectionWorryCalculation(inspectionTokens)
        const testOperation = (itemWorry: number) => {
            const mod = Array.from(monkeyLines.matchAll(/Test: divisible by (\d+)/gm))[0][1];
            return (itemWorry % +mod) === 0;
        }
        const throwOnTrueTest = (itemWorry: number, monkeys: Monkey[]) => {
            const monkeyIndex = Array.from(monkeyLines.matchAll(/If true: throw to monkey (\d+)/gm))[0][1];
            monkeys[+monkeyIndex].catch(itemWorry);
        }
        const throwOnFalseTest = (itemWorry: number, monkeys: Monkey[]) => {
            const monkeyIndex = Array.from(monkeyLines.matchAll(/If false: throw to monkey (\d+)/gm))[0][1];
            monkeys[+monkeyIndex].catch(itemWorry);
        }

        return new Monkey(
            items,
            inspectionWorry,
            testOperation,
            throwOnTrueTest,
            throwOnFalseTest
        )
    }

    private static createInspectionWorryCalculation(operationTokens: string[]): (oldValue: number) => number {
        return (oldValue: number) => {
            const x = operationTokens[0] === "old" ? oldValue : +operationTokens[0];
            const y = operationTokens[2] === "old" ? oldValue : +operationTokens[2];
            switch (operationTokens[1]) {
                case "*":
                    return x * y;
                case "+":
                    return x + y;
                default:
                    throw new Error("Operation not supported");
            }
        };
    }
}