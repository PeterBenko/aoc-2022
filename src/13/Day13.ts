import { type } from "os";

type Packet = Packet[] | number;

export class Day13 {
    private packets: [Packet, Packet][]

    constructor(input: string) {
        this.packets = input.split("\n\n").map((pairString) => {
            const pair = pairString.split("\n");
            return [JSON.parse(pair[0]), JSON.parse(pair[1])];
        });
    }

    public sumInRightOrder(): number {
        return this.packets.reduce((acc, [left, right], index) => {
            const areOrdered = this.areInRightOrder(left,right);
            // console.log("areOrdered", areOrdered, index);
            switch (areOrdered) {
                case 1:
                    return acc + index + 1; // yay for packet count starting at 1
                default:
                    return acc;
            }
        }, 0)
    }

    public areInRightOrder(left: Packet, right: Packet): number {
        if(typeof left === "number" && typeof right === "number") {
            const diff = right - left;
            return Math.min(1, Math.max(-1, diff));
        }

        if(!Array.isArray(left)) {
            return this.areInRightOrder([left], right);
        } else if (!Array.isArray(right)) {
            return this.areInRightOrder(left, [right]);
        }

        for (const index of new Array(Math.max(left.length, right.length)).keys()) {
            const leftElement = left?.[index];
            const rightElement = right?.[index];

            if (leftElement == null || rightElement == null) {
                if (leftElement == null && rightElement == null) {
                    return 0;
                } else if (leftElement != null) {
                    return -1;
                } else {
                    return 1;
                }
            } else {
                const order = this.areInRightOrder(leftElement, rightElement);
                if(order != 0){
                    return order;
                }
            }
        }

        return 0;
    }
}