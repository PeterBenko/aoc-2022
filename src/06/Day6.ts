
export class Day6 {

    private signalSequence: string[] = [];

    constructor(input: string) {
        this.signalSequence = [...input];
    }

    public findStartOfPacketMarker(): number {
        return this.findUniqueBuffer(4)
    }
    
    public findStartOfMessageMarker(): number {
        return this.findUniqueBuffer(14);
    }

    private findUniqueBuffer(size: number): number {
        const buffer: string[] = [];
        for (const [i, signal] of this.signalSequence.entries()) {
            const bufferFull = buffer.length === size;
            if (bufferFull) {
                if (this.bufferUnique(buffer)){
                    return i;
                }
                buffer.shift();
            }

            buffer.push(signal);
        }

        throw new Error("Marker not found");
    }

    public bufferUnique(buffer: string[]): boolean {
        return [... new Set(buffer)].length === buffer.length;
    }
}