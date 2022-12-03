type Compartments = [string, string];

export class Day3 {

    private rucksacks: Compartments[];

    constructor(list: string) {
        this.rucksacks = list.split("\n").map((rucksack) => {
            const middle = rucksack.length / 2;
            const compartments =  [rucksack.slice(0, middle), rucksack.slice(middle)]
            return compartments as Compartments;
        });
    }

    public sumPrioritiesOfDuplicates(): number {
        const duplicates = this.findDuplicatesInRucksacks();
        const sum = [...duplicates].reduce((acc, item) => acc + this.getPriority(item), 0);
        return sum;
    }

    public findDuplicatesInRucksacks(): string {
        let duplicateItems = "";
        for (const compartments of this.rucksacks) {
            duplicateItems += this.findDuplicatesInCompartments(compartments);
        }
        return duplicateItems;
    } 

    private findDuplicatesInCompartments(compartments: Compartments): string {
        for (const item of compartments[0]) {
            if (compartments[1].includes(item)) {
                return item;
            }
        }
        return ""
    }

    public getPriority(item: string): number {
        const charVal = item.charCodeAt(0);

        var mask = 1 << 5
        const charFlippedCaps = charVal ^ mask;
        let priority = charFlippedCaps - 64
        // There's a gap of 6 characters between the letters
        if (priority > 26) {
            priority -= 6;
        } 
        return priority;
    }
}