import { PrismaClient } from "@prisma/client";

import Point from "../../domain/entity/Point";
import PointRepository from "../../domain/repository/PointRepository";

export default class PointRepositoryDatabase implements PointRepository {
    constructor(readonly databaseConnection: PrismaClient) {}

    async list(): Promise<Point[] | undefined> {
        let pointList;
        await this.databaseConnection.points.findMany().then((res) => {
            pointList = res;
        });
        return pointList;
    }
}
