import { Point2d } from "../09/Point2d";
import * as fs from 'fs';

export class Day14 {
    private readonly inlet = new Point2d(500,0)
    private readonly map: ("." | "o" | "#")[][];

    constructor(input: string, floor: boolean = false) {
        const pixels = input.split("\n").flatMap(contour => 
            contour.split(" -> ").map(corner => {
                const coords = corner.split(",");
                return new Point2d(+coords[0], +coords[1])
            }).flatMap((corner, index, array) => {
                return this.pixelsBetween(array[index-1], corner)
            })
        );

        const width = (Math.max(...pixels.map(pixel => pixel.x)) + 1) * 2;
        const height = Math.max(...pixels.map(pixel => pixel.y)) + 1;
        this.map = new Array(height).fill('.').map(_ => new Array(width).fill('.'));
        pixels.forEach(pixel => this.map[pixel.y][pixel.x] = "#")

        if (floor) {
            this.map.push(new Array(width).fill('.'));
            this.map.push(new Array(width).fill('#'));
        }
    }

    private pixelsBetween(start: Point2d, end: Point2d): Point2d[] {
        const pixels: Point2d[] = []
        if(!start){
            return pixels;
        }   

        // Draw left to right, up to down
        let sortedStart = start;
        let sortedEnd = end;
        if (sortedEnd.x < sortedStart.x || sortedEnd.y < sortedStart.y) {
            sortedEnd = start;
            sortedStart = end;
        }

        for (let x = sortedStart.x; x <= sortedEnd.x; x++) {
            for (let y = sortedStart.y; y <= sortedEnd.y; y++) {
                pixels.push(new Point2d(x,y));                
            }
        }

        return pixels;
    }

    public fill() {
        let contender: Point2d | undefined = this.inlet;
        let placedSand = 0;
        while (contender) {
            const newContender = this.fall(contender);
            if (newContender?.equals(contender)) {
                // Place sand
                this.map[contender.y][contender.x] = "o";
                placedSand++;
                if (contender.equals(this.inlet)) {
                    break;
                }
                contender = this.inlet;
            } else {
                contender = newContender;
            }
        }
        fs.writeFileSync('src/14/output.txt', this.map.map(line => line.join("")).join("\n"), 'utf8');
        return placedSand;
    }

    public fall(position: Point2d): Point2d | undefined {
        const down = this.map[position.y + 1]?.[position.x];
        if (down === ".") {
            return new Point2d(position.x, position.y +1);
        } else if (!down) {
            return undefined;
        }
        
        const downLeft = this.map[position.y + 1]?.[position.x - 1];
        if (downLeft === ".") {
            return new Point2d(position.x - 1 , position.y +1);
        } else if (!downLeft) {
            return undefined;
        }

        const downRight = this.map[position.y + 1]?.[position.x + 1];
        if (downRight === ".") {
            return new Point2d(position.x + 1 , position.y +1);
        } else if (!downRight) {
            return undefined;
        }

        return position;
    }
}