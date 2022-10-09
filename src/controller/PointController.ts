import { PrismaClient } from "@prisma/client";

import Point from "../domain/entity/Point";
import PointRepositoryDatabase from "../infra/database/PointRepositoryDatabase";

export default class PointController {
    constructor(readonly databaseConnection: PrismaClient) {}

    async list(): Promise<Point[] | undefined> {
        const pointRepository = new PointRepositoryDatabase(
            this.databaseConnection
        );
        const points = await pointRepository.list();
        return points;
    }
}
