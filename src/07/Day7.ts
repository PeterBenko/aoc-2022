import * as crypto from "crypto";

type File = number;
type Folder = { [key: string]: Folder | File }

export class Day7 {

    private fs: Folder = {};

    constructor(input: string) {
        const cmdLine = input.split("\n");
        this.fs = this.processCmdlines(cmdLine);
    }

    private processCmdlines(lines: string[]): Folder {
        const initialState: {cwd: string[], fs: any} = { cwd: [], fs: {} };
        const state = lines.reduce((state, line) => {
            const linePart = line.split(" ");
            const firstSet = linePart[0];
            if (firstSet === "$") {
                // Input
                switch (linePart[1]) {
                    case "cd":
                        if (linePart[2] === "/") {
                            state.cwd = ["/"];
                        } else if (linePart[2] === "..") {
                            state.cwd.pop();
                        } else {
                            state.cwd.push(linePart[2]!);
                        }
                    case "ls":
                    default:
                        break; // nothing to do
                }
            } else {
                // Output
                if (firstSet === "dir") {
                    // nothing to do here
                } else {
                    // Found a file
                    const fileSize = +firstSet;
                    const fileName = linePart[1];
                    const folder = this.open(state.fs, [...state.cwd]);
                    folder[fileName] = fileSize;
                }
            }
            return state;
        }, initialState);
        return state.fs
    }

    private open(currentFolder: Folder, pathToTraverse: string[]): Folder {
        if(pathToTraverse.length === 0) {
            return currentFolder;
        }
        const nextPath = pathToTraverse.shift()!;
        if (currentFolder[nextPath] == null) {
            currentFolder[nextPath] = {} as Folder;
        };
        return this.open(currentFolder[nextPath] as Folder, pathToTraverse);
    }

    public findFoldersBelow(maxSize: number): number {
        const sizes: { [key: string]: number } = {};
        const rootSize = this.getFolderSize(this.fs, sizes);
        console.info("Full size: ", rootSize);

        let filteredSizes = 0;
        for (const [name, size] of Object.entries(sizes)) {
            if (size < maxSize) {
                filteredSizes +=size;
            }
        }

        return filteredSizes;
    }

    public getSmallestFolderForEnoughSpace(): number {
        const maxSpace = 70000000;
        const sizes: { [key: string]: number } = {};
        const rootSize = this.getFolderSize(this.fs, sizes);
        const freeSpace = maxSpace - rootSize;
        const spaceDiff = 30000000 - freeSpace;

        let sizeToDelete = maxSpace;
        for (const [name, size] of Object.entries(sizes)) {
            const freesEnoughSpace = size > spaceDiff;
            const smallerThanContender = size < sizeToDelete;
            if (freesEnoughSpace && smallerThanContender) {
                sizeToDelete = size;
            }
        }

        return sizeToDelete;
    }

    private getFolderSize(folder: Folder, sizes: { [key: string]: number }): number {
        let size = 0;
        for (const [name, element] of Object.entries(folder)) {
            if (typeof element !== 'number'){
                const folderSize = this.getFolderSize(folder[name] as Folder, sizes);
                size += folderSize;
                sizes[name + "+" + crypto.randomUUID()] = folderSize;
            } else {
                size+=element;
            }            
        }
        return size;
    }
}