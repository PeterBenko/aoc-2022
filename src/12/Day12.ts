type Tile = {
    elevation: number,
    neighbors: Tile[],
    path: Tile[]
}

export class Day12 {

    private mapTiles: Tile[][];

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
                    neighbors,
                    path: []
                };
                neighbors.forEach(neighbor => {
                    neighbor.neighbors.push(tile);
                })
                mapTiles[y].push(tile);
            }
        }
        this.mapTiles = mapTiles;
    }

    public findPath(): number {
        const allTiles = this.mapTiles.flat();
        const startTile = allTiles.find(tile => tile.elevation === "S".charCodeAt(0))!;
        startTile.elevation = "a".charCodeAt(0);
        const endTile = allTiles.find(tile => tile.elevation === "E".charCodeAt(0))!;
        endTile.elevation = "z".charCodeAt(0);

        let inspecting: Tile[] = [startTile];
        const visitedTiles: Tile[] = [];
        let stepCount = 0;
        while (true) {
            const nextGeneration: Tile[] = [];
            for (const tile of inspecting) {
                if (tile === endTile) {
                    return stepCount;
                }
                for (const neighbor of tile.neighbors) {
                    const hasBeenVisited = visitedTiles.includes(neighbor);
                    const willBeVisited = nextGeneration.includes(neighbor);
                    const isReachable = (neighbor.elevation - tile.elevation) <= 1
                    if (!hasBeenVisited && !willBeVisited && isReachable) {                        
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