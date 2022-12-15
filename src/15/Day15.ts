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
                const tiles = [{ point: new Point2d(data.sensor.x, depth), source: data }];
                for (const diff of new Array(depthDiff).keys()) {
                    tiles.push({ point: new Point2d(data.sensor.x - diff - 1, depth), source: data });
                    tiles.push({ point: new Point2d(data.sensor.x + diff + 1, depth), source: data });
                }
                return tiles;
            })
            .filter((tile) => beacons.findIndex((t) => t.equals(tile.point)) < 0) // Beacons can be where beacons are
            .filter((tile, index, self) => self.findIndex((t) => t.point.equals(tile.point)) === index)
            .sort((a,b) => a.point.x - b.point.x); // Debug
        return tiles.length;
    }
}