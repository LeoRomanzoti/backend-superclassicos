import { PrismaClient } from "@prisma/client";

import Point from "../../domain/entity/Point";
import PointRepository from "../../domain/repository/PointRepository";

export default class PointRepositoryDatabase implements PointRepository {
    constructor(readonly databaseConnection: PrismaClient) {}

    async getById(pointId: string): Promise<Point | undefined> {
        const point = await this.databaseConnection.points.findUnique({
            where: {
                id: pointId,
            },
        });
        if (!point) return;
        return point;
    }

    async list(): Promise<Point[] | undefined> {
        const points = await this.databaseConnection.points.findMany();
        return points;
    }
}
