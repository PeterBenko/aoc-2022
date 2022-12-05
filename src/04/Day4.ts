type Assignment = number[];
type Pair = [Assignment, Assignment]

export class Day4 {

    private assignments: Pair[];

    constructor(list: string) {
        this.assignments = list
        .split("\n")
        .map((pair) => pair.split(","))
        .map(([elf1, elf2]) => {
            const assignment1 = elf1.split("-").map(str => +str);
            const assignment2 = elf2.split("-").map(str => +str);
            return [
                this.assignedSectors(assignment1),
                this.assignedSectors(assignment2)
            ]                
        });
    }

    private assignedSectors(assignment1: number[]): number[] {
        const start = assignment1[0];
        const end = assignment1[1];
        return [...Array(end - start + 1).keys()].map((val) => val + start);
    }

    public countFullyContainedAssignments(): number {
        return this.assignments.reduce((acc, pair) => {
            return this.contains(pair[0], pair[1]) || this.contains(pair[1], pair[0]) ? acc+1 : acc; 
        }, 0)
    }

    private contains(assignment1: Assignment, assignment2: Assignment): boolean {
        const uniqueSectors = this.removeDuplicates(assignment1, assignment2);
        return uniqueSectors.length === 0;
    }

    public countOverlapping(): number {
        return this.assignments.reduce((acc, pair) => {
            return this.overlap(pair[0], pair[1]) ? acc+1 : acc; 
        }, 0)
    }

    private overlap(assignment1: Assignment, assignment2: Assignment): boolean {
        const uniqueSectors = this.removeDuplicates(assignment1, assignment2);
        return uniqueSectors.length != assignment1.length;
    }

    private removeDuplicates(assignment1: Assignment, assignment2: Assignment) {
        return assignment1.filter(sector => !assignment2.includes(sector));
    }
}