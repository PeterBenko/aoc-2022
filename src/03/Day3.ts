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

    public sumBadgePriorities(): number {
        const rucksacks = [...this.rucksacks];
        let badges = "";
        while (rucksacks.length > 0){
            // ! since we trust the list to have only complete groups
            badges += this.findBadge([rucksacks.shift()!, rucksacks.shift()!, rucksacks.shift()!])
        }
        return [...badges].reduce((acc, badge) => acc + this.getPriority(badge), 0);
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

    private findBadge(group: [Compartments, Compartments, Compartments]): string {
        const rucksacksUnited = [[...group[0][0], ...group[0][1]], [...group[1][0], ...group[1][1]], [...group[2][0], ...group[2][1]]];
        for (const item of rucksacksUnited[0]) {
            if (rucksacksUnited[1].includes(item) && rucksacksUnited[2].includes(item)) {
                return item;
            }
        }

        throw new Error("Badge not found");        
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