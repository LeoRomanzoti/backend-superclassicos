import Point from "../../domain/entity/Point";
import PointRepository from "../../domain/repository/PointRepository";

export default class PointRepositoryMemory implements PointRepository {
    points: Point[];
    constructor() {
        this.points = [new Point("1", 8, "Gol", "G")];
    }

    list(): Promise<Point[] | undefined> {
        throw new Error("Method not implemented.");
    }

    async getById(pointId: string): Promise<Point | undefined> {
        return this.points.find((p) => p.id === pointId);
    }
}
