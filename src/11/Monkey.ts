export class Monkey {
    private inspectCount = 0;

    public getInspectCount(): number {
        return this.inspectCount;
    }

    constructor(private readonly items: number[],
                private readonly worryOnInspection: (oldValue: number) => number,
                public readonly testDivisor: number,
                private readonly throwOnTrueTest: (itemWorry: number, monkeys: Monkey[]) => void,
                private readonly throwOnFalseTest: (itemWorry: number, monkeys: Monkey[]) => void) {
        
    }

    public throwAll(monkeys: Monkey[], reliefManagement: (itemWorry: number) => number) {
        while (this.items.length > 0){
            const item = this.items.shift();
            const worryAfterInspection = this.inspect(item!, reliefManagement);
            if (this.test(worryAfterInspection)) {
                this.throwOnTrueTest(worryAfterInspection, monkeys);
            } else {
                this.throwOnFalseTest(worryAfterInspection, monkeys);
            };
        }
    }

    private test(itemWorry: number): boolean {
        return (itemWorry % this.testDivisor) === 0;
    }
    
    private inspect(item: number, reliefManagement: (itemWorry: number) => number) {
        this.inspectCount++;
        const inspectionWorry = this.worryOnInspection(item);
        const afterInspectionWorry = reliefManagement(inspectionWorry) ?? inspectionWorry;
        return afterInspectionWorry;
    }

    public catch(itemWorry: number) {
        this.items.push(itemWorry);
    }
}