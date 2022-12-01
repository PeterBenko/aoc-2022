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
        console.log(elfCount);
    }

    public mostCaloriesCarried(): number {
        return Math.max(...this.consolidatedCalories);
    }
}