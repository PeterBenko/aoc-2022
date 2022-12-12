type Tile = {
    elevation: number,
    neighbors: Tile[]
}

export class Day12 {

    private mapTiles: Tile[][];
    private startTile!: Tile;
    private endTile!: Tile;

    constructor(input: string) {
        const elevationMap: number[][] = input.split("\n").map(
            mapRow => mapRow.split("").map(elevationChar => elevationChar.charCodeAt(0))
        );

        const mapTiles: Tile[][] = [];
        for (const [y, row] of elevationMap.entries()) {
            if (mapTiles.length === y) {
                mapTiles.push([]);
            }

            for (const [x, elevation] of row.entries()) {
                const neighbors = [mapTiles[y]?.[x + 1], mapTiles[y]?.[x - 1], mapTiles[y + 1]?.[x], mapTiles[y - 1]?.[x]].filter(Boolean);
                const tile: Tile = {
                    elevation,
                    neighbors
                };

                if (elevation === "S".charCodeAt(0)){
                    this.startTile = tile;
                    tile.elevation = "a".charCodeAt(0);
                }

                if (elevation === "E".charCodeAt(0)) {
                    this.endTile = tile;
                    tile.elevation = "z".charCodeAt(0);
                }

                neighbors.forEach(neighbor => {
                    neighbor.neighbors.push(tile);
                })
                mapTiles[y].push(tile);
            }
        }
        this.mapTiles = mapTiles;
    }

    public findPath(): number {
        const startTile = this.startTile;
        const endTileCheck = (tile: Tile) => tile === this.endTile;        
        const isReachable = (tile: Tile, neighbor: Tile): boolean => (neighbor.elevation - tile.elevation) <= 1;
        return this.findPathBetweenTiles(startTile, endTileCheck, isReachable);
    }

    public findScenicPath(): number {
        const startTile = this.endTile;
        const endTileCheck = (tile: Tile) => tile.elevation === "a".charCodeAt(0);
        const isReachable = (tile: Tile, neighbor: Tile): boolean => (tile.elevation - neighbor.elevation) <= 1;
        return this.findPathBetweenTiles(startTile, endTileCheck, isReachable);
    }

    private findPathBetweenTiles(start: Tile, endTileCheck: (tile: Tile) => boolean, isReachable: (tile: Tile, neighbor: Tile) => boolean) {
        let inspecting: Tile[] = [start];
        const visitedTiles: Tile[] = [];
        let stepCount = 0;
        while (true) {
            const nextGeneration: Tile[] = [];
            for (const tile of inspecting) {
                if (endTileCheck(tile)) {
                    return stepCount;
                }
                for (const neighbor of tile.neighbors) {
                    const hasBeenVisited = visitedTiles.includes(neighbor);
                    const willBeVisited = nextGeneration.includes(neighbor);
                    if (!hasBeenVisited && !willBeVisited && isReachable(tile, neighbor)) {                        
                        nextGeneration.push(neighbor);
                    }
                }
            }
            if (nextGeneration.length === 0){
                throw new Error("No solution found");
            }

            stepCount++;
            visitedTiles.concat(inspecting);
            inspecting = nextGeneration;
        }
    }
}