export class Day1 {
    private readonly consolidatedCalories: number[] = [];

    /**
     * @param list a space & newline separated list of rations noted by the elves 
     */
    constructor(list: string) {
        const rations = list.split("\n");
        let elfCount = 0
        for (const ration of rations) {
            if (this.consolidatedCalories.length == elfCount) {
                this.consolidatedCalories.push(0);
            }

            if (ration == '') {
                elfCount++;
                continue;
            }
                
            this.consolidatedCalories[elfCount] += +ration;
        }
    }

    public mostCaloriesCarried(): number {
        return this.getTopCalories(1);
    }

    public getTopCalories(count: number): number {
        const sorted = this.consolidatedCalories.sort((first, second) => first - second)
        const relevantCalories = sorted.slice(-count);
        return relevantCalories.reduce((acc, val) => acc+=val);
    }
}