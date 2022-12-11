export class Monkey {
    private inspectCount = 0;

    public getInspectCount(): number {
        return this.inspectCount;
    }

    constructor(private items: number[],
                private worryOnInspection: (oldValue: number) => number,
                private test: (itemWorry: number) => boolean,
                private throwOnTrueTest: (itemWorry: number, monkeys: Monkey[]) => void,
                private throwOnFalseTest: (itemWorry: number, monkeys: Monkey[]) => void) {
        
    }

    public throwAll(monkeys: Monkey[], reliefManagement?: (itemWorry: number) => number) {
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
    
    private inspect(item: number, reliefManagement?: (itemWorry: number) => number) {
        this.inspectCount++;
        const inspectionWorry = this.worryOnInspection(item);
        const afterInspectionWorry = reliefManagement?.(inspectionWorry) ?? inspectionWorry;
        const inputHardCodeDivisorProduct = 9699690;
        return afterInspectionWorry % inputHardCodeDivisorProduct;
    }

    public catch(itemWorry: number) {
        this.items.push(itemWorry);
    }
}