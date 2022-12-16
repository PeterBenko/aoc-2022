import { Point2d } from "../09/Point2d";

export class Day15 {
    private sensorData : {sensor: Point2d, beacon: Point2d, distance: number}[] ;

    constructor(input: string) {
        const matches = Array.from(input.matchAll(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/gm));
        this.sensorData = matches.flatMap((match) => {
            const sensor = new Point2d(+match[1], +match[2]);
            const beacon = new Point2d(+match[3], +match[4]);
            return {
                sensor,
                beacon,
                distance: sensor.manhattanTo(beacon)
            }
        });
    }

    public scannedAtDepth(depth: number): number {
        const beacons = this.sensorData.map(data => data.beacon);
        const tiles = this.sensorData
            .filter(data => Math.abs(data.sensor.y - depth) <= data.distance)
            .flatMap(data => {
                const depthDiff = Math.abs(data.distance - Math.abs(data.sensor.y - depth));
                const tiles = [data.sensor.x];
                for (const diff of new Array(depthDiff).keys()) {
                    tiles.push(data.sensor.x - diff - 1);
                    tiles.push(data.sensor.x + diff + 1);
                }
                return tiles;
            })
            .filter((x) => beacons.findIndex((t) => t.equals(new Point2d(x, depth))) < 0) // Beacons can be where beacons are
            // .filter((tile, index, self) => self.findIndex((t) => t.point.equals(tile.point)) === index)
            // .sort((a,b) => a.point.x - b.point.x); // Debug
        return [...new Set(tiles)].length;
    }

    public findLostSignal(min: number, max: number): number {
        for (let depth = min; depth < max; depth++) {
            if (depth % 40000 === 0) {
                console.log(depth / 40000);
            }

            const tilesAtDepth: [number, number, any][] = [];
            for (const data of this.sensorData) {
                if(Math.abs(data.sensor.y - depth) > data.distance){
                    continue;
                }

                const depthDiff = Math.abs(data.distance - Math.abs(data.sensor.y - depth));
                if (depthDiff === 0) {
                    tilesAtDepth.push([data.sensor.x, data.sensor.x, [data.sensor.x, data.sensor.y, data.distance, depthDiff]])
                } else if (depthDiff > 0){
                    tilesAtDepth.push([data.sensor.x - depthDiff, data.sensor.x + depthDiff, [data.sensor.x, data.sensor.y, data.distance, depthDiff]]);
                }
            }

            // join the ranges
            const sortedRanges = tilesAtDepth.sort((a, b) => a[0] - b[0]);
            let start = Math.max(0, sortedRanges[0][0]);
            let end = sortedRanges[0][1];
            for (let i = 1; i < sortedRanges.length; i++) {
                if (sortedRanges[i][0] - end > 1) {
                    const x = end + 1;
                    console.log("HIT!:", sortedRanges, x, i);
                    return depth + 4000000*x;
                }

                end = Math.max(end, sortedRanges[i][1]);
            }
            console.log(depth, sortedRanges, start, end);
        }

        throw new Error("Distress beacon not found");
    }
}