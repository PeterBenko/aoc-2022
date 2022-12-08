export class Day8 {
    // [y][x]
    private readonly trees: number[][] = [];

    constructor(input: string) {
        this.trees = input.split("\n").map(val => [...val].map(val => +val));
    }

    public countVisibleTrees(): number {
        return this.findVisibleTrees().flat().reduce((acc, val) => val != " " ? acc+1 : acc, 0);
    }

    private findVisibleTrees(): string[][] {
        const treesVisible: string[][] = Array(this.trees.length).fill([]).map(() => [...Array(this.trees[0].length).fill(" ")]);

        for (let y = 0; y < this.trees.length; y++) {
            const treeLine = this.trees[y];

            let highestFromWest = -1;
            for (let x = 0; x < treeLine.length; x++) {
                const height = treeLine[x];

                if (highestFromWest < height) {
                    highestFromWest = height;
                    treesVisible[y][x] = ">";
                }
            }

            let highestFromEast = -1;
            for (let x = treeLine.length - 1; x >= 0; x--) {
                const height = treeLine[x];

                if (highestFromEast < height) {
                    highestFromEast = height;
                    treesVisible[y][x] = "<";
                }
            }
        }

        for (let x = 0; x < this.trees.length; x++) {
            const treeLine = this.trees.map((value) => value[x]);

            let highestFromNorth = -1;
            for (let y = 0; y < treeLine.length; y++) {
                const height = treeLine[y];

                if (highestFromNorth < height) {
                    highestFromNorth = height;
                    treesVisible[y][x] = "v";
                }
            }

            let highestFromSouth = -1;
            for (let y = treeLine.length - 1; y >= 0; y--) {
                const height = treeLine[y];

                if (highestFromSouth < height) {
                    highestFromSouth = height;
                    treesVisible[y][x] = "^";
                }
            }
        }

        console.log(treesVisible.map(treeLine => treeLine.join("")).join("\n"));

        return treesVisible;
    }

    public getMaxScenicScore(): number {
        let max = 0;
        for (let y = 0; y < this.trees.length; y++) {
            for (let x = 0; x < this.trees[0].length; x++) {
                const score = this.getScenicScore(y, x);
                if (score > max){
                    max = score;
                }
            }
        }

        return max;
    }

    public getScenicScore(y: number, x: number): number {
        if (y === this.trees.length - 1 || y === 0 ||
            x === this.trees[0].length - 1 || x === 0) {
                return 0;
            }

        const tree = this.trees[y][x];
        const treeLine = this.trees[y];
        const treeColumn = this.trees.map((value) => value[x]);

        const treeLineBefore = treeLine.slice(0, x).reverse();
        const treeLineAfter = treeLine.slice(-(treeLine.length - x - 1));

        const treeColumnBefore = treeColumn.slice(0, y).reverse();
        const treeColumnAfter = treeColumn.slice(-(treeColumn.length - y - 1));

        return this.scoreView(treeLineBefore, tree) * 
                this.scoreView(treeLineAfter, tree) * 
                this.scoreView(treeColumnBefore, tree)* 
                this.scoreView(treeColumnAfter, tree);
    }

    private scoreView(trees: number[], fromHeight: number): number {
        const treesSeen = trees.findIndex(height => height >= fromHeight);
        switch (treesSeen) {
            case -1:
                // No blockers
                return trees.length;
            case 0:
                return 1;
            default:
                return treesSeen + 1;
        }
    }
}