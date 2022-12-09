export class Point2d {
    constructor(public readonly x: number, public readonly y: number) {
    }

    public add(other: Point2d): Point2d {
      return new Point2d(this.x + other.x, this.y + other.y);
    };

    public sub(other: Point2d): Point2d {
      return new Point2d(this.x - other.x, this.y - other.y);
  };

  public equals(other: Point2d): boolean {
      return this.x === other.x && this.y === other.y;
  };
}